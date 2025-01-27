import re

# Read the CSS file
with open('n:/2023 exam website moch/flaskr/static/main.css', 'r') as file:
    css_content = file.read()

# Find all color codes
color_codes = re.findall(r'#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}', css_content)

# Use a set to remove duplicates
unique_color_codes = set(color_codes)

# Print the unique color codes
for color in unique_color_codes:
    print(color)