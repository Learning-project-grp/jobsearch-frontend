import { Icon, IconProps } from '@chakra-ui/react'

interface Props extends IconProps {}

const BannerIcon = (props: Props) => {
  return (
    <Icon viewBox="0 0 100% 100%" {...props}>
      <defs>
        <path id="a" d="M0 0h1162.209v258.411H0z" />
        <path id="c" d="M0 0h430.01v94.804H0z" />
        <path id="e" d="M0 0h348.71v214.66H0z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path fill="#080559" d="M0 258.411h1440.829V0H0z" />
        <g transform="translate(217.086)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            fill="#0D3880"
            d="M1020.187-228.769l142.022 206.702-598.321 447.09S420.606 533.861 266.382 468.75C112.16 403.64 30.902 247.24 13.202 177.063c-17.701-70.178-39.98-189.8 98.14-321.81l68.198-59.049 130.343 191.49s-88.135 44.4-77.163 128.234c11.786 90.056 114.963 146.371 227.602 62.83l559.865-407.527z"
            mask="url(#b)"
          />
        </g>
        <g transform="translate(343.26)">
          <mask id="d" fill="#fff">
            <use xlinkHref="#c" />
          </mask>
          <path
            fill="#E60278"
            d="M430.01-75.382L118.302-310.02 0-140.841 307.201 94.804z"
            mask="url(#d)"
          />
        </g>
        <g transform="translate(0 43.75)">
          <mask id="f" fill="#fff">
            <use xlinkHref="#e" />
          </mask>
          <path
            fill="#E60278"
            d="M154.41 0S10.147 205.784-210.092 82.075l-121.535 182.29s382.78 244.72 680.338-136.511L154.41 0z"
            mask="url(#f)"
          />
        </g>
      </g>
    </Icon>
  )
}

export default BannerIcon