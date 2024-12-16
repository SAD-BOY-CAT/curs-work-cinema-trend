export type Fonts = {
    h1: Font;
    h2: Font;
    h3: Font;
    ht1: Font;
    ht2: Font;
    s: Font;
}

export type Font = {
    fontFamily: string;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    fontSize: number;
}

export const fonts : Fonts = {
    h1: {
        fontFamily: 'Nunito-Bold',
        weight: 600,
        fontSize: 24,
    },
    h2: {
        fontFamily: 'Nunito-SemiBold',
        weight: 600,
        fontSize: 20,
    },
    h3: {
        fontFamily: 'Nunito-SemiBold',
        weight: 600,
        fontSize: 14,
    },
    ht1: {
        fontFamily: 'Nunito-Regular',
        weight: 400,
        fontSize: 16,
    },
    ht2: {
        fontFamily: 'Nunito-Regular',
        weight: 400,
        fontSize: 14,
    },
    s: {
        fontFamily: 'Nunito-Regular',
        weight: 400,
        fontSize: 10,
    }
}