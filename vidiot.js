#ifdef GL_ES
    precision mediump float;
    #endif
    uniform float time;
    uniform vec2 resolution;
    // GLSL gives us this for free... our first sampler2D automatically
    // points to our first bound texture.
    uniform sampler2D uSampler;
    vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
        vec4 color = vec4(0.0);
        vec2 off1 = vec2(1.3846153846) * direction;
        vec2 off2 = vec2(3.2307692308) * direction;
        color += texture2D(image, uv) * 0.2270270270;
        color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
        color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
        color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
        return color;
    }
    
    void main() {
        // texture2D lets us lookup a pixel in a texture by passing xy values from 0–1
        // to get those normalized values we divide gl_FragCoord (measured in pixels) by our resolution
        vec2 offset = 1. / resolution;
        vec3 base = texture2D( uSampler, gl_FragCoord.xy / resolution).rgb;
        vec3 lowerleft = texture2D( uSampler, gl_FragCoord.xy / resolution - offset).rgb;
        vec3 upperright = texture2D( uSampler, gl_FragCoord.xy / resolution + offset).rgb;
        gl_FragColor = vec4( vec3(base * .15 + lowerleft * .325 + upperright * .325), 1.);
        //gl_FragCoord = blur9( uSampler, gl_FragCoord.xy / resolution, resolution, vec2(2.) );
    }