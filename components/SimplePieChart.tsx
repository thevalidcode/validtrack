/**
 * Simple Pie Chart Component
 *
 * Custom pie chart implementation using react-native-svg.
 * Used for category spending visualization.
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
import { colors } from "../theme";

interface PieChartData {
  value: number;
  color: string;
  label: string;
}

interface SimplePieChartProps {
  data: PieChartData[];
  size?: number;
  innerRadius?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({
  data,
  size = 200,
  innerRadius = 60,
}) => {
  const center = size / 2;
  const radius = size / 2 - 10;

  // Calculate total
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Generate pie slices
  let currentAngle = -90; // Start from top

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    // Calculate path
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    // Outer arc
    const outerPath = `
      M ${center},${center}
      L ${x1},${y1}
      A ${radius},${radius} 0 ${largeArc} 1 ${x2},${y2}
      Z
    `;

    // Calculate label position (middle of slice)
    const labelAngle = (((startAngle + endAngle) / 2) * Math.PI) / 180;
    const labelRadius = radius * 0.7;
    const labelX = center + labelRadius * Math.cos(labelAngle);
    const labelY = center + labelRadius * Math.sin(labelAngle);

    return {
      path: outerPath,
      color: item.color,
      labelX,
      labelY,
      label: `$${item.value.toFixed(0)}`,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G>
          {slices.map((slice, index) => (
            <Path key={index} d={slice.path} fill={slice.color} opacity={0.9} />
          ))}

          {/* Center circle for donut effect */}
          <Circle
            cx={center}
            cy={center}
            r={innerRadius}
            fill={colors.cardBackground}
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
