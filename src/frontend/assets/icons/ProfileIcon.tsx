import { Svg, Circle, ClipPath, Image as SvgImage } from "react-native-svg";

type Params = {
    photoUri: string,
    width: number,
    clr: string,
};

export default function ProfileIcon({ photoUri, width, clr } : Params) {
    const borderWidth = 2
    const rStroke = width/2 - borderWidth/2;
    const rClip = rStroke - 1 - borderWidth / 2;
  return (
    <Svg width={width} height={width}>
      {/* Define a clipping path (circle) */}
      <ClipPath id="clip">
        <Circle cx={width/2} cy={width/2} r={rClip} />
      </ClipPath>

      {/* Apply the clipping path to the image */}
      <SvgImage
        href={{ uri: photoUri }}
        width={width}
        height={width}
        clipPath="url(#clip)"
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Optional: stroke outline around the circle */}
      <Circle
        cx={width/2}
        cy={width/2}
        r={rStroke}
        stroke={clr}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}