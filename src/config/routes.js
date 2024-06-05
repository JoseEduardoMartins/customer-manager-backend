import application from '../routers/application.router';
import customerTags from '../routers/customer-tag.router';
import customer from '../routers/customer.router';
import tag from '../routers/tag.router';

const routes = [application, customer, customerTags, tag];

export default routes;
