
import Expo, { WebBrowser } from "expo";
import { Linking } from "react-native";

openWebPage = async (url) => {
    if (!url) throw 'MISSED_PARAMS';

    try {
        return await WebBrowser.openBrowserAsync(url);
    } catch (e) {
        console.log('Error', e);
    }
};

openMailto = async (url) => {
    if (!url) throw 'MISSED_PARAMS';

    Linking.openURL(url);
};




module.exports = {
    openWebPage : openWebPage,
    openMailto  : openMailto,
};