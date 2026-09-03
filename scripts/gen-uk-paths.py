"""Regenerate UK map SVG paths with blended aspect ratio."""

import json
import math
import urllib.request

URL = (
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
    "master/geojson/ne_50m_admin_0_countries.geojson"
)

# 0 = square fit (too squat), 1 = full geographic (too tall). ~0.5 = middle ground.
ASPECT_BLEND = 0.52

data = json.loads(urllib.request.urlopen(URL, timeout=60).read())
feat = next(
    f for f in data["features"] if f["properties"].get("NAME") == "United Kingdom"
)
coords = feat["geometry"]["coordinates"]

all_pts: list[tuple[float, float]] = []
for poly in coords:
    all_pts.extend(poly[0])

lons = [p[0] for p in all_pts]
lats = [p[1] for p in all_pts]
min_lon, max_lon = min(lons), max(lons)
min_lat, max_lat = min(lats), max(lats)

lon_span = max_lon - min_lon
lat_span = max_lat - min_lat
mean_lat = (min_lat + max_lat) / 2
lon_scale = math.cos(math.radians(mean_lat))
geo_w = lon_span * lon_scale

size = 100
pad = 3
inner = size - 2 * pad

squish_scale_x = inner / lon_span
squish_scale_y = inner / lat_span

geo_scale = inner / lat_span
geo_scale_x = lon_scale * geo_scale
geo_scale_y = geo_scale

blend = ASPECT_BLEND
scale_x = squish_scale_x * (1 - blend) + geo_scale_x * blend
scale_y = squish_scale_y * (1 - blend) + geo_scale_y * blend

all_projected: list[tuple[float, float]] = []


def project(lon: float, lat: float) -> tuple[float, float]:
    x = (lon - min_lon) * scale_x
    y = (max_lat - lat) * scale_y
    return round(x, 2), round(y, 2)


for poly in coords:
    for lon, lat in poly[0]:
        all_projected.append(project(lon, lat))

xs = [p[0] for p in all_projected]
ys = [p[1] for p in all_projected]
offset_x = (size - (max(xs) - min(xs))) / 2 - min(xs)
offset_y = (size - (max(ys) - min(ys))) / 2 - min(ys)


def project_centered(lon: float, lat: float) -> tuple[float, float]:
    x, y = project(lon, lat)
    return round(x + offset_x, 2), round(y + offset_y, 2)


def ring_path(ring: list[list[float]]) -> str:
    pts = [project_centered(lon, lat) for lon, lat in ring]
    parts = [f"M{pts[0][0]},{pts[0][1]}"]
    for x, y in pts[1:]:
        parts.append(f"L{x},{y}")
    parts.append("Z")
    return "".join(parts)


paths = [ring_path(poly[0]) for poly in coords]

map_w = max(xs) - min(xs)
map_h = max(ys) - min(ys)
print(f"blend={blend} display aspect h/w: {map_h/map_w:.2f}")

lines = [
    f"export const UK_MAP_VIEW_SIZE = {size};",
    "export const UK_MAP_PATHS = [",
]
for p in paths:
    lines.append(f'  "{p}",')
lines.append("] as const;")

out = "app/components/uk-map-paths.ts"
with open(out, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"written {len(paths)} paths to {out}")
