<!--
  @component
  Generates a a WebGl scatter plot.
 -->
 <script>
    import reglWrapper from 'regl';
    import { getContext } from 'svelte';
  
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
    
    // TODO HIGHLIGHT THE RELEVNT POINT HERE 
    export let highlight_id = undefined; 
    console.log("scatter has", highlight_id);
  
    /** @type {Number} [r=5] - The circle's radius. */
    export let r = 5;
  
    /** @type {String} [fill='#0cf'] - The circle's fill color. */
    export let fill = '#08f';
  
    export let stroke = '#fc1703'; // Not yet implemented
    // export let strokeWidth = 0;
  
    function hexToRgbPercent (hex) {
      let str = hex.replace('#', '');
      if (str.length === 3) {
        str = str[0] + str[0] + str[1] + str[1] + str[2] + str[2];
      }
      return str.match(/.{1,2}/g).map(d => parseInt(d, 16) / 255);
    }
  
    const { gl } = getContext('gl');
  
    function resize () {
      if ($gl) {
        const canvas = $gl.canvas;
        // Lookup the size the browser is displaying the canvas.
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
  
        // Check if the canvas is not the same size.
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          // Make the canvas the same size
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }
        $gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }
  
    let regl;
  
    function render () {
      if ($gl) {
        regl = reglWrapper({
          gl: $gl,
          extensions: ['oes_standard_derivatives']
        });
  
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1
        });
  
        const draw = regl({
          // circle code comes from:
          // https://www.desultoryquest.com/blog/drawing-anti-aliased-circular-points-using-opengl-slash-webgl/
          frag: `
          #extension GL_OES_standard_derivatives : enable
          precision mediump float;
          uniform vec3 fill_color;
          uniform vec3 stroke_color;
          varying float s_s;
          void main () {
  
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  
            float dist = dot(cxy, cxy);
  
            float delta = fwidth(dist);
  
            float alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, dist);
  
            float outer_edge_center = 1.0 - s_s;
            float stroke = 1.0 - smoothstep(outer_edge_center - delta, outer_edge_center + delta, dist);
  
            // gl_FragColor = vec4(fill_color,1.0) * alpha;
            gl_FragColor = vec4( mix(stroke_color, fill_color, stroke), 1.0 ) * alpha;
            gl_FragColor.rgb *= gl_FragColor.a;
          }`,
          vert: `
          precision mediump float;
          attribute vec2 position;
          attribute float r;
          attribute float z;
          attribute float stroke_size;
  
          varying float s_s;
  
          uniform float stage_width;
          uniform float stage_height;
  
          // http://peterbeshai.com/beautifully-animate-points-with-webgl-and-regl.html
          vec2 normalizeCoords(vec2 position) {
            // read in the positions into x and y vars
            float x = position[0];
            float y = position[1];
            return vec2(
              2.0 * ((x / stage_width) - 0.5),
              // invert y to treat [0,0] as bottom left in pixel space
              -(2.0 * ((y / stage_height) - 0.5))
            );
          }
  
          void main () {
            s_s = stroke_size;
            gl_PointSize = r;
            gl_Position = vec4(normalizeCoords(position), z, 1.0);
          }`,
          attributes: {
            // There will be a position value for each point
            // we pass in
            position: (context, props) => {
              return props.points.map(point => {
                return [$xGet(point), $yGet(point)];
              });
            },
            z: (context, props) => {
              return props.points.map(point => {
                if (typeof highlight_id !== 'undefined') {
                  if (point.id == highlight_id) {
                      return -0.99;
                    } else {
                      return 0.0;
                    }
                  } else {
                  return 0.0; 
                }
              });
            },
            r: (context, props) => {
              // const m = window.devicePixelRatio > 1 ? 4.0 : 2.0
              // If using an r-scale, set width here
              return props.points.map(point => {
                if (typeof highlight_id !== 'undefined') {
                  if (point.id == highlight_id) {
                      return props.pointWidth * 3;
                    } else {
                      return props.pointWidth;
                    }
                  } else {
                  return props.pointWidth; 
                }
              }
              );
              
              // props.pointWidth * 4);
            },
            stroke_size: (context, props) => {
              // If using an r-scale, set width here
              return props.points.map(point => {
                if (typeof highlight_id !== 'undefined') {
                  if (point.id == highlight_id) {
                      return 0.25;
                    } else {
                      return 0;
                    }
                  } else {
                  return 0; 
                }
              });
            },
            // fill_color: (context, props) => {
            //   // TODO map points everything t blue except highlight point 
            //   return props.points.map(point => '#000');
            // }
          },
          uniforms: {
            fill_color: hexToRgbPercent('#33ddff'), //OLD LAYERCAKE 
            // stroke_color: [0.6705882352941176, 0, 0.8392156862745098],
            stroke_color: hexToRgbPercent(stroke),
            // FYI: there is a helper method for grabbing
            // values out of the context as well.
            // These uniforms are used in our fragment shader to
            // convert our x / y values to WebGL coordinate space.
            stage_width: regl.context('drawingBufferWidth'),
            stage_height: regl.context('drawingBufferHeight')
          },
          count: (context, props) => {
            // set the count based on the number of points we have
            return props.points.length;
          },
          primitive: 'points',
          blend: {
            enable: true,
            func: {
              srcRGB: 'src alpha',
              srcAlpha: 'src alpha',
              dstRGB: 'one minus src alpha',
              dstAlpha: 'one minus src alpha'
            }
          },
          depth: {
            enable: true
          },
        });
  
        draw({
          pointWidth: (r * 2) * 1.5,
          points: $data
        });
      }
    }
  
    $: ($width, $height, $gl, resize(), render());
  
  </script>