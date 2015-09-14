varying vec3 interpolatedNormal;
varying vec3 reflectColour;
varying vec3 normalInterp;
varying vec3 vertPos;
varying vec3 ambientColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 diffuseColour;

void main() {
    vec3 normal = normalize(normalInterp);
    vec3 lightDir = normalize(lightPosition - vertPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    vec3 viewDir = normalize(-vertPos);

    float lam = max(dot(lightDir,normal), 0.0);
    float specular = 0.0;

    if(lam > 0.0) {
       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       specular = pow(specAngle, 8.0);
    }
    gl_FragColor = vec4(ambientColor + lam*diffuseColour + specular*lightColor, 1.0);
}
