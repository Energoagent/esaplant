import sys
import ezdxf
from sys import argv

script, first = argv


try:
    inputDXF = ezdxf.readfile(first)
    outputSVG = open(first.replace('dxf', 'svg'), 'w', encoding = 'UTF-8')
    outputSVG.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n')
    outputSVG.write('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1000" height="1000" viewBox="0 0 1000 1000">\n')
    outputSVG.write('<g fill="none" stroke="black" stroke-width="0.5">\n')

    msp = inputDXF.modelspace()

    def handleEntity(entity):
        if entity.dxftype() == 'INSERT':
            svgBlock = f'<g class="{entity.dxf.name}" '
            blockIDattr = entity.get_attrib('ID')
            if blockIDattr:
                attrPlacement = blockIDattr.get_placement()
                svgBlock = svgBlock + f'id="{blockIDattr.dxf.text}"'
            svgBlock = svgBlock + '>\n'
            outputSVG.write(svgBlock)
            if blockIDattr:
                x1 = round(attrPlacement[1][0])
                y1 = round(attrPlacement[1][1])
                svgText = f'<text x="{x1}" y="{y1}" style="font-size: 5">{blockIDattr.dxf.text}</text>\n'
                outputSVG.write(svgText)
            for ent in entity.virtual_entities():
                handleEntity(ent)
            svgBlock = '</g>\n'
            outputSVG.write(svgBlock)
        if entity.dxftype() == 'LINE':
            x1 = round(entity.dxf.start[0])
            y1 = round(entity.dxf.start[1])
            x2 = round(entity.dxf.end[0])
            y2 = round(entity.dxf.end[1])
            svgLine = f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"/>\n'
            outputSVG.write(svgLine)
        if entity.dxftype() == 'CIRCLE':
            cx = round(entity.dxf.center[0])
            if cx < 0: cx = - cx
            cy = round(entity.dxf.center[1])
            r = round(entity.dxf.radius)
            svgCircle = f'<circle cx="{cx}" cy="{cy}" r="{r}"/>\n'
            outputSVG.write(svgCircle)
        if entity.dxftype() == 'LWPOLYLINE':
            svgPath = '<path d="'
            firstEnt = True
            for ent in entity.virtual_entities():
                if ent.dxftype() == 'LINE':
                    endx = round(ent.dxf.end[0])
                    endy = round(ent.dxf.end[1])
                    if firstEnt:
                        startx = round(ent.dxf.start[0])
                        starty = round(ent.dxf.start[1])
                        svgPath = svgPath + f'M {startx} {starty} '
                        firstEnt = False
                    svgPath = svgPath + f'L {endx} {endy} '
                if ent.dxftype() == 'ARC':
                    rx = round(ent.dxf.radius)
                    endx = round(ent.end_point[0])
                    endy = round(ent.end_point[1])
#                    print(ent.dxf.extrusion)
                    i0 = round(ent.dxf.extrusion[0])
                    i1 = round(ent.dxf.extrusion[1])
                    i2 = round(ent.dxf.extrusion[2])
                    if i2 < 0: i2 = 0
                    if firstEnt:
                        startx = round(ent.start_point[0])
                        starty = round(ent.start_point[1])
                        svgPath = svgPath + f'M {startx} {starty} '
                        firstEnt = False
                    svgPath = svgPath + f'A {rx}, {rx} {i0} {i1}, {i2} {endx}, {endy} '
            svgPath = svgPath + '"/>\n'
            outputSVG.write(svgPath)
        if entity.dxftype() == 'TEXT':
            placement = entity.get_placement()
            x1 = round(placement[1][0])
            y1 = round(placement[1][1])
            svgText = f'<text class="LABEL" x="{x1}" y="{y1}" style="font-size: 5">{entity.dxf.text}</text>\n'
            outputSVG.write(svgText)
    
    for e in msp: 
        handleEntity(e)
          
    outputSVG.write('</g>\n</svg>')
    outputSVG.close()
    
except IOError:
    print(f"Not a DXF file or a generic I/O error.")
    sys.exit(1)
except ezdxf.DXFStructureError:
    print(f"Invalid or corrupted DXF file.")
    sys.exit(2)