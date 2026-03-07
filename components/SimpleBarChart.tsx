/**
 * Simple Bar Chart Component
 *
 * Custom bar chart implementation using react-native-svg.
 * Used for weekly/monthly spending trends.
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { G, Line, Rect, Text as SvgText } from "react-native-svg";
import { colors } from "../theme";

interface BarChartData {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarChartData[];
  width?: number;
  height?: number;
  barColor?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  width = 320,
  height = 200,
  barColor = colors.primary,
}) => {
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const yScale = chartHeight / maxValue;

  // Bar width calculation
  const barWidth = (chartWidth / data.length) * 0.6;
  const barSpacing = chartWidth / data.length;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <G transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
            const y = chartHeight - tick * chartHeight;
            return (
              <G key={`grid-${i}`}>
                <Line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={colors.border}
                  strokeDasharray="4,4"
                  opacity={0.5}
                />
                <SvgText
                  x={-8}
                  y={y + 4}
                  fontSize="10"
                  fill={colors.textSecondary}
                  textAnchor="end"
                >
                  {(maxValue * tick).toFixed(0)}
                </SvgText>
              </G>
            );
          })}

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = item.value * yScale;
            const x = index * barSpacing + (barSpacing - barWidth) / 2;
            const y = chartHeight - barHeight;

            return (
              <G key={`bar-${index}`}>
                {/* Bar */}
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={barColor}
                  rx={4}
                  opacity={0.9}
                />

                {/* Label */}
                <SvgText
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  fontSize="12"
                  fill={colors.text}
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {item.label}
                </SvgText>
              </G>
            );
          })}

          {/* X and Y axis */}
          <Line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke={colors.border}
            strokeWidth={2}
          />
          <Line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke={colors.border}
            strokeWidth={2}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
