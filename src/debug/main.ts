import { createShell } from '../app/shell-ui';
import {LoginPackage} from './login';
import dev from './dev';
import mpo from '../mpo';

const identityService = dev.createLocalStorageIdentityService('/login', '/login');
const auditService = mpo.createMpoAuditService('https://audit.monportail.test.ulaval.ca/audit/v1');
const gaService = dev.createDummyGaService();

const shell = createShell(identityService, auditService, gaService);

shell.registerPackages([{
    packageName: 'login',
    rootElement: 'log',
    load: () => Promise.resolve(new LoginPackage()),
    rootPath: '/login'
},
{
    packageName: 'mpoAdmission',
    rootElement: 'adm',
    load: 'http://localhost:8095/app.js',
    rootPath: '/'
}]);

shell.start();

// shell.auditError('A bad thing happened.', new Error('Oh la la'));

// mpo.authenticateWithMpoPortail('https://monportail.testpr.ulaval.ca', 'adsy1', '').then(res => console.info(res));
