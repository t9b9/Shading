varying vec3 interpolatedNormal;
varying vec3 reflectColour;
varying vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 diffuseColour;

void main() {
    
	
	vec3 n = normalize(normalMatrix * normal);
    //n = normalize(vec3(modelViewMatrix * vec4(n, 1.0)));
	 
	vec4 viewVec4 =  modelViewMatrix * vec4(position, 1.0);
	vec3 viewVec3 = vec3(viewVec4) / viewVec4.w;
	
	vec4 LVec4 =  viewMatrix * vec4(lightPosition, 1.0);
	vec3 LVec3 = vec3(LVec4) / LVec4.w;
	

	//vec3 lightDir = normalize(LVec3 - viewVec3);
	vec3 lightDir = normalize(LVec3 - position);

	
	vec3 reflectDir = reflect(-lightDir, n);
	vec3 viewDir = normalize(-viewVec3);
	
	float lam = max(dot(lightDir,n), 0.0);
    float specular = 0.0;
	
	if(lam > 0.0) {
		float specAngle = max(dot(reflectDir, viewDir), 0.0);
		specular = pow(specAngle, 12.0);
	}

	reflectColour = lam*diffuseColour + specular*lightColor + ambientColor;
	
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
