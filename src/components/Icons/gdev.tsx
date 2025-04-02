import * as React from "react"
import Image from "next/image"
const GDevIcon = () => (
  <div>
    <Image className="hidden dark:block object-contain size-4" src="/assets/logo/gdev_logo_light.png" alt="Logo" width={24} height={24} />
    <Image className="block dark:hidden object-contain size-4" src="/assets/logo/gdev_logo_dark.png" alt="Logo" width={24} height={24} />
  </div>
)
export default GDevIcon

