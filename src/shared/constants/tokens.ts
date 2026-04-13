export const tokens = {
  color: {
    bg: {
      primary: "#F5F8FD",
      secondary: "#FFFFFF",
      card: "#FFFFFF",
      overlay: "rgba(0, 0, 0, 0.65)",
    },
    accent: {
      primary: "#6115CD",
      secondary: "#FF2B75",
    },
    text: {
      primary: "#111416",
      secondary: "#57626F",
      tertiary: "#5C5C5C",
      onAccent: "#FFFFFF",
    },
    error: "#E53935",
    like: "#FF2B75",
    skeleton: "#EEEFF1",
  },
  button: {
    primary: {
      default: "#6115CD",
      pressed: "#4E11A4",
      loading: "#4E11A4",
      disabled: "#D5C9FF",
    },
    action: {
      default: "#EFF2F7",
      pressed: "#D4D4D4",
      disabled: "#FFFFFF",
    },
    like: {
      inactive: {
        default: "#EFF2F7",
        pressed: "#D4D4D4",
        disabled: "#FFFFFF",
      },
      active: {
        default: "#FF2B75",
        pressed: "#DE2465",
        disabled: "#FFBAD2",
      },
    },
  },
  spacing: {
    xxs: 6,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  font: {
    family: {
      regular: "Manrope_400Regular",
      medium: "Manrope_500Medium",
      semiBold: "Manrope_600SemiBold",
      bold: "Manrope_700Bold",
      extraBold: "Manrope_800ExtraBold",
    },
    size: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 20,
      xxl: 24,
    },
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  },
  cover: {
    height: 200,
  },
} as const;
