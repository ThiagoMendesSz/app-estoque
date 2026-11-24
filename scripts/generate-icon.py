"""Recria o ícone geométrico do Lastro; Pillow é necessário só nesta ferramenta."""
from pathlib import Path
from PIL import Image, ImageDraw
image = Image.new('RGB', (2048, 2048), '#461025')
draw = ImageDraw.Draw(image)
for y, fill in [(1170, '#9B5168'), (920, '#B77C85'), (670, '#D4B485')]:
    draw.polygon([(400,y),(1024,y-320),(1648,y),(1024,y+320)], fill=fill)
draw.line([(390,1700),(1658,1700)], fill='#D4B485', width=16)
target = Path(__file__).resolve().parents[1] / 'assets' / 'icon.png'
target.parent.mkdir(parents=True, exist_ok=True)
image.resize((1024, 1024), Image.Resampling.LANCZOS).save(target)
print(target)
