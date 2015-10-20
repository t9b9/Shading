varying vec3 interpolatedNormal;
varying vec3 reflectColour;

void main() {
  //vec3 v3 = (5, 5, 5);
  //gl_FragColor = vec4(v3, 1.0);
  gl_FragColor = vec4(reflectColour, 1.0);
}
