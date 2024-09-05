import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIComponent = () => {
	return <SwaggerUI url="/swagger.yaml" />;
};

export default SwaggerUIComponent;
