import React, { useState, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { 
  Path, 
  Defs, 
  ClipPath, 
  Rect, 
  G, 
  Circle 
} from 'react-native-svg';

interface GreenLineWithPointProps {
  demandesCount: number;
}

interface PointPosition {
  x: number;
  y: number;
}

interface PathPoint {
  x: number;
  y: number;
}

export default function GreenLineWithPoint({ demandesCount }: GreenLineWithPointProps) {
  const [position, setPosition] = useState<number>(demandesCount);
  const [pointPosition, setPointPosition] = useState<PointPosition>({ x: 400, y: 460 });

  // Mettre à jour la position lorsque demandesCount change
  useEffect(() => {
    setPosition(demandesCount);
  }, [demandesCount]);

  // Calcule la position du point sur le chemin en fonction de la valeur
  useEffect(() => {
    // Normaliser la valeur entre 0 et 1
    const normalizedValue = Math.max(0, Math.min(1000, position)) / 1000;
    
    // Points clés du chemin pour interpolation
    const pathPoints: PathPoint[] = [
      { x: 89.53, y: 637.94 },    // Début du chemin (à gauche) - valeur 0
      { x: 144.65, y: 451.30 },   // Point près du milieu-gauche
      { x: 405.70, y: 457.44 },   // Point au milieu
      { x: 691.57, y: 487.46 },   // Point près du milieu-droit
      { x: 842.84, y: 275.79 }    // Fin du chemin (à droite) - valeur 1000
    ];
    
    // Trouver les points entre lesquels interpoler
    const segmentIndex = Math.min(
      Math.floor(normalizedValue * (pathPoints.length - 1)), 
      pathPoints.length - 2
    );
    
    const startPoint = pathPoints[segmentIndex];
    const endPoint = pathPoints[segmentIndex + 1];
    
    // Calculer la position locale dans le segment
    const segmentProgress = (normalizedValue * (pathPoints.length - 1)) - segmentIndex;
    
    // Interpolation linéaire entre les deux points
    const x = startPoint.x + segmentProgress * (endPoint.x - startPoint.x);
    const y = startPoint.y + segmentProgress * (endPoint.y - startPoint.y);
    
    setPointPosition({ x, y });
  }, [position]);

  const containerStyle: ViewStyle = {
    width: '100%',
    height: 200
  };

  return (
    <View style={containerStyle}>
      <Svg
        viewBox="0 100 950 700"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%' }}
      >
        <Defs>
          <ClipPath id="ebefa60551">
            <Path d="M 77 273 L 853 273 L 853 642 L 77 642 Z M 77 273" />
          </ClipPath>
          <ClipPath id="e07f5905e9">
            <Path d="M 392.328125 0 L 875.238281 291.238281 L 507.8125 900.484375 L 24.898438 609.242188 Z M 392.328125 0" />
          </ClipPath>
          <ClipPath id="39d92c9a31">
            <Path d="M 874.921875 291.046875 L 392.007812 -0.191406 L 24.582031 609.050781 L 507.492188 900.289062 Z M 874.921875 291.046875" />
          </ClipPath>
          <ClipPath id="de3e2d0b2e">
            <Path d="M 79.78125 628.1875 L 99.285156 628.1875 L 99.285156 647.695312 L 79.78125 647.695312 Z M 79.78125 628.1875" />
          </ClipPath>
          <ClipPath id="7cef591f73">
            <Path d="M 89.53125 628.1875 C 84.144531 628.1875 79.78125 632.554688 79.78125 637.941406 C 79.78125 643.328125 84.144531 647.695312 89.53125 647.695312 C 94.917969 647.695312 99.285156 643.328125 99.285156 637.941406 C 99.285156 632.554688 94.917969 628.1875 89.53125 628.1875 Z M 89.53125 628.1875" />
          </ClipPath>
          <ClipPath id="b8d2b2eb15">
            <Path d="M 833.082031 266.03125 L 852.585938 266.03125 L 852.585938 285.539062 L 833.082031 285.539062 Z M 833.082031 266.03125" />
          </ClipPath>
          <ClipPath id="bd7ce63134">
            <Path d="M 842.835938 266.03125 C 837.449219 266.03125 833.082031 270.398438 833.082031 275.785156 C 833.082031 281.171875 837.449219 285.539062 842.835938 285.539062 C 848.222656 285.539062 852.585938 281.171875 852.585938 275.785156 C 852.585938 270.398438 848.222656 266.03125 842.835938 266.03125 Z M 842.835938 266.03125" />
          </ClipPath>
          <ClipPath id="6c2770fa45">
            <Path d="M 301 301 L 599 301 L 599 599 L 301 599 Z M 301 301" />
          </ClipPath>
        </Defs>

        <Rect x="-90" y="-90" width="1080" height="1080" fill="#ffffff" />

        {/* Ligne verte principale */}
        <G clipPath="url(#ebefa60551)">
          <G clipPath="url(#e07f5905e9)">
            <G clipPath="url(#39d92c9a31)">
              <Path
                fill="#4e986d"
                d="M 80.238281 641.902344 C 79.984375 640.578125 74.191406 608.917969 78.96875 569.726562 C 85.363281 516.960938 108.078125 476.003906 144.652344 451.304688 C 227.183594 395.570312 332.179688 423.882812 405.699219 457.4375 C 524.320312 511.570312 620.511719 521.65625 691.566406 487.460938 C 758.027344 455.371094 805.714844 383.285156 833.246094 273.074219 L 852.6875 277.929688 C 837.792969 337.601562 816.933594 387.21875 790.691406 425.390625 C 765.78125 461.628906 735.367188 488.578125 700.253906 505.472656 C 659.269531 525.234375 610.980469 531.699219 556.648438 524.792969 C 509.117188 518.742188 455.539062 502.222656 397.335938 475.652344 C 328.488281 444.234375 230.660156 417.371094 155.820312 467.933594 C 78.765625 520.003906 99.679688 637.015625 99.90625 638.191406 Z M 80.238281 641.902344"
                fillOpacity="1"
                fillRule="nonzero"
              />
            </G>
          </G>
        </G>

        {/* Point de début (gauche) */}
        <G clipPath="url(#de3e2d0b2e)">
          <G clipPath="url(#7cef591f73)">
            <Path
              fill="#4e986d"
              d="M 79.78125 628.1875 L 99.285156 628.1875 L 99.285156 647.695312 L 79.78125 647.695312 Z M 79.78125 628.1875"
              fillOpacity="1"
              fillRule="nonzero"
            />
          </G>
        </G>

        {/* Point de fin (droite) */}
        <G clipPath="url(#b8d2b2eb15)">
          <G clipPath="url(#bd7ce63134)">
            <Path
              fill="#4e986d"
              d="M 833.082031 266.03125 L 852.585938 266.03125 L 852.585938 285.539062 L 833.082031 285.539062 Z M 833.082031 266.03125"
              fillOpacity="1"
              fillRule="nonzero"
            />
          </G>
        </G>

        {/* Icône de cible */}
        <G transform="translate(380, -140)">
          <G clipPath="url(#6c2770fa45)">
            <Path 
              fill="#4e986d" 
              d="M 573.683594 447.984375 C 572.613281 381.363281 518.628906 327.378906 452.007812 326.308594 L 452.007812 301.003906 L 447.984375 301.003906 L 447.984375 326.308594 C 381.363281 327.378906 327.378906 381.363281 326.308594 447.984375 L 301.003906 447.984375 L 301.003906 452.007812 L 326.308594 452.007812 C 327.378906 518.628906 381.363281 572.613281 447.984375 573.683594 L 447.984375 598.988281 L 452.007812 598.988281 L 452.007812 573.683594 C 518.628906 572.613281 572.613281 518.628906 573.683594 452.007812 L 598.988281 452.007812 L 598.988281 447.984375 Z M 452.007812 569.65625 L 452.007812 536.757812 L 447.984375 536.757812 L 447.984375 569.65625 C 383.585938 568.589844 331.402344 516.410156 330.335938 452.007812 L 361.183594 452.007812 L 361.183594 447.984375 L 330.335938 447.984375 C 331.402344 383.582031 383.585938 331.402344 447.984375 330.335938 L 447.984375 361.355469 L 452.007812 361.355469 L 452.007812 330.335938 C 516.410156 331.402344 568.589844 383.582031 569.65625 447.984375 L 538.808594 447.984375 L 538.808594 452.007812 L 569.65625 452.007812 C 568.589844 516.410156 516.410156 568.589844 452.007812 569.65625 Z M 506.136719 447.984375 L 502.109375 447.984375 C 501.050781 420.152344 478.085938 397.832031 449.996094 397.832031 C 421.90625 397.832031 398.941406 420.152344 397.882812 447.984375 L 393.855469 447.984375 C 394.917969 417.929688 419.6875 393.804688 449.996094 393.804688 C 480.304688 393.804688 505.074219 417.929688 506.136719 447.984375 Z M 502.109375 452.011719 L 506.136719 452.011719 C 505.070312 482.0625 480.304688 506.1875 449.996094 506.1875 C 419.6875 506.1875 394.921875 482.0625 393.855469 452.011719 L 397.882812 452.011719 C 398.945312 479.84375 421.90625 502.164062 449.996094 502.164062 C 478.085938 502.164062 501.046875 479.84375 502.109375 452.011719 Z M 502.109375 452.011719" 
              fillOpacity="1" 
              fillRule="nonzero"
            />
          </G>
        </G>

        {/* Point orange positionnable sur la ligne */}
        <Circle
          cx={pointPosition.x}
          cy={pointPosition.y}
          r="8"
          fill="#ff6b35"
          stroke="#ffffff"
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
}