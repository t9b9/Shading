varying vec3 interpolatedNormal;
varying vec3 reflectColour;
varying vec3 ambientColor;
varying vec3 normalInterp;
varying vec3 vertPos;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 diffuseColour;
varying vec3 lightPos;

void main() {
    vec3 normal = normalize(normalInterp);
    vec3 lightDir = normalize(lightPos - vertPos);
    float lam = max(dot(lightDir,normal), 0.0);

	vec3 acolor;
	if (lam > 0.98)
		acolor = vec3(0.95,0.95,0.99);
	else if (lam > 0.97)
		acolor = vec3(0.85,0.85,0.88);
	else if (lam > 0.25)
		acolor = vec3(0.4,0.4,0.8);
	else
		acolor = vec3(0.1,0.1,0.3);
		
	gl_FragColor = vec4(acolor,1.0);
}
