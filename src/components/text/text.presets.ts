import { TextStyle, Platform } from 'react-native';
import { colors } from '../../theme/colors';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
    color: colors.text,
    fontSize: 14,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
    /**
     * The default text styles.
     */
    default: BASE,

    /**
     * A bold version of the default text.
     */
    bold: { ...BASE, fontWeight: Platform.select({ ios: 'bold', android: undefined }) } as TextStyle,

    /**
     * Large headers.
     */
    header: { ...BASE, fontSize: 20 } as TextStyle,

    /**
     * Field labels that appear on forms above the inputs.
     */
    title: { ...BASE, fontSize: 24, fontWeight: Platform.select({ ios: 'bold', android: undefined }), color: colors.text } as TextStyle,

    /**
     * A smaller piece of secondary information.
     */
    subtitle: { ...BASE, fontSize: 13, color: colors.subtitle } as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
