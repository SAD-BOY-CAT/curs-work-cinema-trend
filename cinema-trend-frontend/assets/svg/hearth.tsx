import { colors } from "@/constants/colors";
import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export type HearthSvg = SvgProps & {
    variant: "FILL" | "UNFILL"
    width?: number;
    height?: number;
    color?: string;
}

const HearthSvg : React.FC<HearthSvg> = ({ variant, width = 18, height = 16, color = colors.dark.white, ...props }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.669 4.367a7.16 7.16 0 00-1.423-1.444c-.65-.49-1.377-.837-2.09-.837-.942 0-1.697.343-2.219.914-.526.575-.85 1.42-.85 2.479 0 1.945 1.078 3.617 2.574 5.106 1.096 1.09 2.358 2.032 3.507 2.888.315.236.622.464.914.688.304-.233.624-.47.952-.714 1.14-.847 2.385-1.772 3.47-2.846C15 9.12 16.078 7.457 16.078 5.513c0-1.058-.325-1.904-.851-2.48-.523-.57-1.277-.913-2.219-.913-.716 0-1.445.34-2.093.822a6.937 6.937 0 00-1.42 1.424.496.496 0 01-.416.219.497.497 0 01-.41-.218zm.414-1.084a8.243 8.243 0 00-1.235-1.159c-.73-.55-1.669-1.038-2.692-1.038-1.2 0-2.23.444-2.957 1.24-.723.79-1.113 1.89-1.113 3.153 0 2.338 1.3 4.252 2.87 5.814 1.15 1.146 2.503 2.155 3.667 3.023.41.306.797.594 1.143.864a.498.498 0 00.632 0c.355-.277.754-.573 1.177-.888 1.155-.858 2.494-1.853 3.633-2.98 1.568-1.554 2.87-3.46 2.87-5.8 0-1.261-.39-2.362-1.113-3.153-.727-.795-1.757-1.239-2.957-1.239-1.02 0-1.957.476-2.69 1.019-.49.364-.912.776-1.235 1.144z"
      />
      <Path
        d="M7.246 2.923l-.301.399.301-.4zm1.423 1.444l.413-.282-.007-.01-.406.292zm-3.513-2.28v.5-.5zM2.937 3l.369.337L2.937 3zm1.724 7.585l-.353.354.353-.354zm3.507 2.888l-.3.401.3-.4zm.914.688l-.304.397.304.232.304-.232-.304-.397zm.952-.714l.299.401.002-.001-.3-.4zm0 0l-.298-.402-.001.002.3.4zm3.47-2.846l-.352-.356.352.356zm1.723-7.567l-.37.337.37-.337zm-2.219-.914v.5-.5zm-2.093.822l-.298-.402.298.402zm-1.42 1.424l-.406-.292-.007.011.413.281zm-.062.075l-.35-.356h-.001l.351.356zm-.14.097l-.21-.453H9.08l.212.453zm-.214.047l.003-.5-.003.5zm-.208-.047l.211-.453-.211.453zm-.144-.1l.355-.353-.355.352zm.356-1.155l-.377.328.375.433.378-.431-.376-.33zM7.848 2.124l.301-.399-.3.4zM2.2 2.325l.369.338-.369-.338zm1.756 8.968l.353-.354-.353.354zm3.668 3.023l-.299.4.3-.4zm1.143.864l.316-.387-.008-.007-.308.394zm.102.065l.214-.452-.214.452zm.217.048l-.003-.5.003.5zm.21-.048l-.213-.452.214.452zm.103-.065l-.308-.394-.008.007.316.387zm1.177-.888l-.298-.401.298.401zm3.633-2.98l.351.354-.351-.355zm1.757-8.953l-.37.337.37-.337zM13.008 1.12v-.5.5zm-2.69 1.019l-.297-.402.298.402zM6.946 3.322c.592.447 1.068.989 1.318 1.336l.812-.583a7.658 7.658 0 00-1.528-1.552l-.602.799zm-1.79-.736c.56 0 1.18.276 1.79.736l.602-.799c-.69-.52-1.523-.937-2.391-.937v1zm-1.849.751c.42-.46 1.037-.75 1.85-.75v-1c-1.071 0-1.963.393-2.588 1.076l.738.674zm-.72 2.142c0-.956.292-1.674.72-2.142l-.738-.674c-.625.683-.982 1.656-.982 2.816h1zm2.428 4.751C3.554 8.778 2.586 7.227 2.586 5.48h-1c0 2.141 1.19 3.934 2.722 5.46l.706-.709zm3.453 2.843c-1.154-.86-2.387-1.78-3.453-2.843l-.706.709c1.125 1.12 2.416 2.082 3.56 2.935l.599-.801zm.919.69c-.296-.225-.605-.456-.92-.69l-.597.801c.316.236.62.462.91.684l.607-.794zm0 .795c.3-.23.618-.466.947-.71l-.597-.803c-.328.244-.65.483-.958.719l.608.794zm.949-.711l-.6-.8.6.8zm-.002.001c1.135-.843 2.409-1.79 3.523-2.892l-.704-.71c-1.055 1.044-2.272 1.95-3.416 2.8l.597.802zm3.523-2.892c1.532-1.517 2.722-3.302 2.722-5.443h-1c0 1.747-.968 3.288-2.426 4.732l.704.71zm2.722-5.443c0-1.16-.358-2.134-.982-2.817l-.738.675c.428.468.72 1.186.72 2.142h1zm-.982-2.817c-.625-.683-1.517-1.076-2.588-1.076v1c.813 0 1.43.292 1.85.751l.738-.675zM13.008 1.62c-.868 0-1.701.408-2.391.92l.596.803c.607-.45 1.23-.723 1.795-.723v-1zm-2.391.92a7.434 7.434 0 00-1.528 1.535l.812.583a6.44 6.44 0 011.312-1.315l-.596-.803zm-.833 2.257a.997.997 0 00.125-.15l-.827-.562.702.712zm-.702-.712l.422.907a.997.997 0 00.281-.196l-.703-.71zm-.006 1a.998.998 0 00.429-.094l-.424-.906h.001l-.006 1zm.006-1l-.423.906a.997.997 0 00.417.094l.006-1zm-.71.704a.997.997 0 00.288.203l.421-.907h.001l-.71.704zm.71-.704l-.826.563c.034.05.073.098.117.142l.708-.705zm.379-1.13a8.742 8.742 0 00-1.312-1.23l-.602.798c.458.346.855.738 1.159 1.088l.755-.656zm-1.312-1.23C7.38 1.143 6.334.586 5.156.586v1c.868 0 1.7.417 2.391.937l.602-.798zM5.156.586c-1.329 0-2.497.495-3.326 1.402l.738.675c.625-.683 1.517-1.077 2.588-1.077v-1zM1.83 1.988C1.008 2.887.586 4.115.586 5.478h1c0-1.16.357-2.132.982-2.815l-.738-.675zM.586 5.478c0 2.536 1.412 4.572 3.016 6.17l.706-.71C2.776 9.414 1.586 7.62 1.586 5.479h-1zm3.016 6.17c1.18 1.175 2.563 2.205 3.722 3.069l.598-.802c-1.168-.871-2.492-1.86-3.614-2.976l-.706.709zm3.722 3.069c.412.306.793.59 1.134.857l.616-.788c-.352-.274-.743-.566-1.152-.871l-.598.802zm1.758.076l-.633.774a.992.992 0 00.206.13l.427-.904zm-.428.904a.998.998 0 00.434.096l-.006-1-.428.904zm.428-.904l.006 1a1 1 0 00.422-.096l-.428-.904zm.427.904c.073-.034.142-.077.206-.13l-.633-.774.427.904zm.768-1.806a62.26 62.26 0 00-1.187.895l.616.788c.35-.273.743-.565 1.167-.88l-.596-.803zm3.579-2.935c-1.11 1.099-2.42 2.073-3.58 2.935l.597.803c1.15-.856 2.518-1.87 3.687-3.028l-.704-.71zm2.722-5.443c0 2.141-1.19 3.926-2.722 5.443l.704.71c1.605-1.59 3.018-3.617 3.018-6.153h-1zm-.982-2.817c.625.683.982 1.656.982 2.817h1c0-1.364-.422-2.593-1.244-3.491l-.738.674zM13.008 1.62c1.071 0 1.963.393 2.588 1.076l.738-.674C15.504 1.115 14.337.62 13.008.62v1zm-2.391.92c.69-.512 1.523-.92 2.391-.92v-1c-1.172 0-2.214.544-2.987 1.117l.596.803zM9.459 3.613c.304-.347.7-.733 1.158-1.073l-.596-.803a8.573 8.573 0 00-1.314 1.217l.752.659z"
        fill={color}
      />
      <Path
        d="M10.382 2.76L9.21 3.931l-2.345-1.76-2.346-.586-1.759.587-1.173 2.345V7.45l2.346 2.932 2.932 2.932 2.345 1.76 1.173-1.174 3.518-2.345 1.76-2.346.586-2.932V3.346l-1.76-1.173-2.345-.587-1.759 1.173z"
        fill={variant === "FILL" ? color : 'none'}
        stroke={color}
      />
    </Svg>
  )
}

export default HearthSvg;