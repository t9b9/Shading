varying vec3 interpolatedNormal;
varying vec3 reflectColour;
varying vec3 ambientColor;
varying vec3 normalInterp;
varying vec3 vertPos;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 diffuseColour;
varying vec3 vPosition;



void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	
    vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
    vertPos = vec3(vertPos4) / vertPos4.w;
    normalInterp = normalMatrix * normal;
                        
}

