import {scaleSizeUI} from "../utils/scaleSizeUI";

export default {
    //Sizes for text and headings only
    textSizeLarge: scaleSizeUI(48),
    textSizeBig: scaleSizeUI(25),
    textSizeModerate: scaleSizeUI(16),
    textSizeSmall: scaleSizeUI(14),
    textSizeTiny: scaleSizeUI(12),

    //Sizes for layout, use these to create sizes of elements or spaces between components
    //in horizontal direction
    sizeMassive: scaleSizeUI(48),
    sizeLarge: scaleSizeUI(32),
    sizeBig: scaleSizeUI(24),
    sizeModerate: scaleSizeUI(16),
    sizeSmall: scaleSizeUI(12),
    sizeSmaller: scaleSizeUI(8),
    sizeTiny: scaleSizeUI(4),

    //Sizes for layout, use these to create sizes of elements or spaces between components
    //in vertical direction
    sizeMassiveH: scaleSizeUI(48, true),
    sizeLargeH: scaleSizeUI(32, true),
    sizeBigH: scaleSizeUI(24, true),
    sizeModerateH: scaleSizeUI(16, true),
    sizeSmallH: scaleSizeUI(12, true),
    sizeSmallerH: scaleSizeUI(8, true),
    sizeTinyH: scaleSizeUI(4, true),
}
