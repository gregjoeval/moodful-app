import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/green';
import ThemeModel from './ThemeModel';

const OriginalTheme = ThemeModel.create({
    name: 'Original',
    type: 'dark'
});

const BlueGreenTheme = ThemeModel.create({
    name: 'Bluegrass',
    primaryColor: primary['500'],
    secondaryColor: secondary.A700
});

export {
    OriginalTheme as DefaultTheme,
    OriginalTheme,
    BlueGreenTheme
};
