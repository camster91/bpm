"""Read-only public BPM URL inventory. No cookies, credentials or form submissions."""
import concurrent.futures
import datetime
import hashlib
import json
from pathlib import Path
import subprocess
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://bpmdeodorant.com'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}


def fetch(url):
    if urlparse(url).netloc != 'bpmdeodorant.com':
        raise ValueError('Unexpected source host')
    result = subprocess.run(['curl', '-fLsS', '--max-time', '25', url], capture_output=True)
    if result.returncode:
        raise RuntimeError('Public fetch failed')
    return result.stdout


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = []
        self.robots = []
        self.sections = []
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('name', '').lower() == 'robots':
            self.robots.append(attrs.get('content'))
        if tag == 'h1':
            self.h1_count += 1
        if attrs.get('id', '').startswith('shopify-section-'):
            self.sections.append(attrs['id'])


def classify(url):
    path = urlparse(url).path
    if path.startswith('/products/'):
        return 'product', ['#7', '#21']
    if path.startswith('/collections/'):
        return 'collection', ['#17']
    if path.startswith('/pages/'):
        return 'page', ['#18']
    if path.startswith('/blogs/'):
        return ('article' if len(path.strip('/').split('/')) > 2 else 'blog'), ['#19']
    if path.startswith('/policies/'):
        return 'policy', ['#29', '#22']
    if path == '/':
        return 'home', ['#16']
    return 'unclassified', ['#13']


def inspect(url):
    kind, issues = classify(url)
    row = {'url': url, 'kind': kind, 'owner_issues': issues, 'decision': 'preserve pending approved change'}
    try:
        raw = fetch(url)
        parser = Page()
        parser.feed(raw.decode())
        row.update({'fetched': True, 'sha256': hashlib.sha256(raw).hexdigest(),
                    'canonicals': parser.canonical, 'robots': parser.robots,
                    'source_h1_count': parser.h1_count, 'section_ids': parser.sections})
    except (RuntimeError, UnicodeDecodeError) as error:
        row.update({'fetched': False, 'error': str(error)})
    return row


index = ET.fromstring(fetch(BASE + '/sitemap.xml'))
sitemaps = [e.text for e in index.findall('s:sitemap/s:loc', NS)]
urls = {BASE + '/'}
discovery = []
for url in sitemaps:
    xml = ET.fromstring(fetch(url))
    locations = [e.text for e in xml.findall('s:url/s:loc', NS)]
    if 'agentic' in url:
        discovery.append({'sitemap': url, 'public_locations': locations})
    else:
        urls.update(locations)
# Policy URLs come from the recovered source register, not invented endpoints.
policies = json.loads((ROOT / 'reference-site/src/content/policies.json').read_text())
for policy in policies.values():
    if isinstance(policy, dict) and policy.get('url'):
        urls.add(policy['url'])
if len(urls) > 150:
    raise RuntimeError('Inventory exceeded bounded 150-page audit; review scope before crawling')
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    rows = list(executor.map(inspect, sorted(urls)))
articles = json.loads((ROOT / 'reference-site/src/content/articles.json').read_text())
source_article_urls = [a['url'] for a in articles]
result = {'retrieved_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'scope': 'Public sitemap URLs plus recovered policy sources. No authenticated templates, stock, app inventory or purchase verification.',
          'sitemaps': sitemaps, 'agentic_discovery': discovery,
          'recovered_article_urls_missing_from_current_sitemap': sorted(set(source_article_urls) - urls),
          'routes': rows}
(ROOT / 'docs/public-url-inventory.json').write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'routes': len(rows), 'failed': sum(not r['fetched'] for r in rows),
                  'kinds': {kind: sum(r['kind'] == kind for r in rows) for kind in sorted({r['kind'] for r in rows})},
                  'agentic_discovery': discovery,
                  'missing_recovered_articles': result['recovered_article_urls_missing_from_current_sitemap']}))
