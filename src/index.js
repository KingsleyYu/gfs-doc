import catBrowser from './utils/CatBrowser.js';
import 'phoenix-styles/less/phoenix-styles.less';

export Button from './form/Button';
export Input from './basic/Input';
export Icon from './Icon';


//接入cat－browser
catBrowser({
    moduleName: 'phoenix-ui',
    isOnlyDp: false
});
