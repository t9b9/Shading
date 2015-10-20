varying vec3 interpolatedNormal;
varying vec3 reflectColour;
varying vec3 ambientColor;
varying vec3 normalInterp;
varying vec3 vertPos;
varying vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 diffuseColour;

void main() {
    vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
	lightPos = vec3(viewMatrix * vec4(lightPosition, 1.0));
    vertPos = vec3(vertPos4);
    normalInterp = normalize(normalMatrix * normal);
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
