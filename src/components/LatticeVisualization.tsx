//Visualizes integer solutions to ax + by = c on a 2D lattice

import { useEffect, useRef } from "react";
import * as d3 from 'd3';

type LatticeVisualizationProps = {
    a: number,
    b: number,
    c: number,
    particular: {
        x: number;
        y: number;
    };
    step: {
        dx: number;
        dy: number;
    };
};

type Point = {
    x: number;
    y: number;
    t: number;
};

const T_MIN = -5;
const T_MAX = 5;

function LatticeVisualization({
    a,
    b,
    c,
    particular,
    step,
}: LatticeVisualizationProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svgElement = svgRef.current;

        if (!svgElement) {
            return;
        }

        const svg = d3.select(svgElement);

        //Clear previous visualization before drawing again
        svg.selectAll('*').remove();

        const width = 700;
        const height = 500;

        const margin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 60,
        };

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        //Generate integer solutions using:
        // 
        // x = x0 + dx*t
        // y = y0 + dy*t
        //
        // Where (x0, y0) is a particular solution
        const points: Point[] = Array.from(
            { length: T_MAX - T_MIN + 1},
                (_, index) => {
                  const t = T_MIN + index;

                  return {
                    x: particular.x + step.dx * t,
                    y: particular.y + step.dy * t,
                    t,
                  };
                }
            );

            //Build viewing window around general solutions
            const xValues = points.map((point) => point.x);
            const yValues = points.map((point) => point.y);
            
            let xMin = Math.min(...xValues);
            let xMax = Math.max(...xValues);
            let yMin = Math.min(...yValues);
            let yMax = Math.max(...yValues);

            //Enables visualization to have brething room
            const xPadding = Math.max(2, (xMax - xMin) * 0.15);
            const yPadding = Math.max(2, (yMax - yMin) * 0.15);

            xMin -= xPadding;
            xMax += xPadding;
            yMin -= yPadding;
            yMax += yPadding;

            //Prevent a zero-width or zero-height domain
            if (xMin === xMax) {
                xMin -= 5;
                xMax += 5;
            }

            if (yMin === yMax) {
                yMin -= 5;
                yMax += 5;
            }

            const xScale = d3
              .scaleLinear()
              .domain([xMin, xMax])
              .range([0, innerWidth]);

            const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            .range([innerHeight, 0]);

            const chart = svg
              .attr('viewBox', `0 0 ${width} ${height}`)
              .attr('preserveAspectRatio', 'xMidYMid meet')
              .append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

            //Grid
            const xGrid = d3
              .axisBottom(xScale)
              .ticks(Math.min(20, Math.max(5, Math.round(xMax - xMin))))
              .tickSize(-innerHeight)
              .tickFormat(() => '');

            const yGrid = d3
              .axisLeft(yScale)
              .ticks(Math.min(20, Math.max(5, Math.round(yMax - yMin))))
              .tickSize(-innerWidth)
              .tickFormat(() => '');

            chart
              .append('g')
              .attr('class', 'grid')
              .attr('transform', `translate(0, ${innerHeight})`)
              .call(xGrid);

            chart
              .append('g')
              .attr('class', 'grid')
              .call(yGrid);

            //Axes
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            chart   
              .append('g')
              .attr('transform', `translate(0, ${innerHeight})`)
              .call(xAxis);

            chart
              .append('g')
              .call(yAxis);

            //Axis labels
            chart
              .append('text')
              .attr('x', innerWidth)
              .attr('y', innerHeight + 40)
              .attr('text-anchor', 'end')
              .text('x')
              
            chart
              .append('text')
              .attr('x', -35)
              .attr('y', -10)
              .attr('text-anchor', 'start')
              .text('y')

            //Draw the equation ax + by = c
            //
            //If b != 0:
            //  y = (c - ax) / b
            //
            //If b == 0:
            //  x = c / a
            if (a !== 0 || b !== 0) {
                if (b !== 0) {
                    const linePoints: [number, number] [] = [
                        [xMin, (c - a * xMin) / b],
                        [xMax, (c - a * xMax) / b],
                    ];

                    chart
                      .append('line')
                      .attr('x1', xScale(linePoints[0][0]))
                      .attr('y1', yScale(linePoints[0][1]))
                      .attr('x2', xScale(linePoints[1][0]))
                      .attr('y2', yScale(linePoints[1][1]))
                      .attr('stroke', 'currentColor')
                      .attr('stroke-width', 2);
                } else {
                    const x = c / a;

                    chart
                      .append('line')
                      .attr('x1', xScale(x))
                      .attr('y1', yScale(yMin))
                      .attr('x2', xScale(x))
                      .attr('y2', yScale(yMax))
                      .attr('stroke', 'currentColor')
                      .attr('stroke-width', 2)
                }
            }
            //Integer solution points
            chart
              .selectAll('.solution-point')
              .data(points)
              .enter()
              .append('circle')
              .attr('class', 'solution-point')
              .attr('cx', (point) => xScale(point.x))
              .attr('cy', (point) => yScale(point.y))
              .attr('r', 5)
              .attr('fill', 'currentColor');
            
            //Label each integer solution with its t-value
            chart
              .selectAll('.solution-label')
              .data(points)
              .enter()
              .append('text')
              .attr('class', 'solution-label')
              .attr('x', (point) => xScale(point.x) + 7)
              .attr('y', (point) => yScale(point.y) - 7)
              .attr('font-size', 12)
              .text((point) => `t=${point.t}`);
        }, [a, b, c, particular, step]);
        
        return (
            <div>
              <h3>Integer Lattice:</h3>

              <svg
                ref={svgRef}
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  height: 'auto',
                  display: 'block',
                }}
              />

              <p>
                Integer solutions shown for t = {T_MIN} to {T_MAX}.
              </p>
            </div>
        );
}

export default LatticeVisualization;