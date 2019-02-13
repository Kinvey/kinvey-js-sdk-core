import AuthorizationGrant from './authorizationGrant';
import exists from './exists';
import forgotUsername from './forgotUsername';
import login from './login';
import loginWithRedirectUri from './loginWithRedirectUri';
import loginWithUsernamePassword from './loginWithUsernamePassword';
import loginWithMIC from './loginWithMIC';
import logout from './logout';
import lookup from './lookup';
import me from './me';
import remove from './remove';
import resetPassword from './resetPassword';
import restore from './restore';
import signup from './signup';
import update from './update';
import getActiveUser from './getActiveUser';
import User from './user';
import verifyEmail from './verifyEmail';
import registerForLiveService from './registerForLiveService';
import unregisterForLiveService from './unregisterForLiveService';

User.AuthorizationGrant = AuthorizationGrant;
User.exists = exists;
User.forgotUsername = forgotUsername;
User.login = login;
User.loginWithRedirectUri = loginWithRedirectUri;
User.loginWithUsernamePassword = loginWithUsernamePassword;
User.loginWithMIC = loginWithMIC;
User.logout = logout;
User.lookup = lookup;
User.me = me;
User.remove = remove;
User.resetPassword = resetPassword;
User.restore = restore;
User.signup = signup;
User.update = update;
User.verifyEmail = verifyEmail;
User.getActiveUser = getActiveUser;
User.registerForLiveService = registerForLiveService;
User.unregisterForLiveService = unregisterForLiveService;

export default User;
