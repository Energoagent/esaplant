

const MILL_UNIT_SHAPE =
`
<style>
text.LABEL {
font: 4px arial;
font-weight: lighter;
}
</style>
<g fill="none" stroke="black" stroke-width="0.5">
<path d="M 98 224 L 100 226 L 102 224 L 98 224 "/>
<line x1="100" y1="224" x2="100" y2="216"/>
<g class="BUNKER_1_4" id="1_4">
<path d="M 75 124 L 125 124 L 125 184 L 75 184 L 75 124 "/>
<path d="M 75 184 L 95 214 L 105 214 L 125 184 "/>
<g class="LEVEL_SENSOR" id="1_4B1">
<circle cx="118" cy="132" r="3"/>
<path d="M 118 135 L 115 132 L 121 132 L 118 135 "/>
</g>
<g class="LEVEL_SENSOR" id="1_4B2">
<circle cx="118" cy="155" r="3"/>
<path d="M 118 158 L 115 155 L 121 155 L 118 158 "/>
</g>
<g class="LEVEL_SENSOR" id="1_4B3">
<circle cx="118" cy="178" r="3"/>
<path d="M 118 181 L 115 178 L 121 178 L 118 181 "/>
</g>
<g class="LEVEL_SENSOR" id="1_4B4">
<circle cx="101" cy="202" r="3"/>
<path d="M 101 205 L 98 202 L 104 202 L 101 205 "/>
</g>
</g>
<g class="BUNKER_GRAINER_BACK" id="2_21">
<path d="M 297 38 L 323 38 L 323 100 L 297 100 L 297 38 "/>
<path d="M 297 100 L 306 110 L 314 110 L 323 100 "/>
<g class="LEVEL_SENSOR" id="hi">
<circle cx="316" cy="43" r="3"/>
<path d="M 316 46 L 313 43 L 319 43 L 316 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low">
<circle cx="316" cy="94" r="3"/>
<path d="M 316 97 L 313 94 L 319 94 L 316 97 "/>
</g>
<g class="BUNKER_GRAINER_BACK_LOW" >
<path d="M 306 110 L 297 100 L 297 97 L 323 97 L 323 100 L 314 110 L 306 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_MIDDLE" >
<path d="M 306 110 L 297 100 L 297 70 L 323 70 L 323 100 L 314 110 L 306 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_HI" >
<path d="M 306 110 L 297 100 L 297 46 L 323 46 L 323 100 L 314 110 L 306 110 "/>
</g>
</g>
<g class="BUNKER_GRAINER_MILL" id="1_18">
<path d="M 247 38 L 297 38 L 297 100 L 247 100 L 247 38 "/>
<path d="M 247 100 L 267 110 L 277 110 L 297 100 "/>
<g class="BUNKER_GRAINER_MILL_HI" >
<path d="M 267 110 L 247 100 L 247 46 L 297 46 L 297 100 L 277 110 L 267 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_LOW" >
<path d="M 267 110 L 247 100 L 247 97 L 297 97 L 297 100 L 277 110 L 267 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_MIDDLE" >
<path d="M 267 110 L 247 100 L 247 70 L 297 70 L 297 100 L 277 110 L 267 110 "/>
</g>
<g class="LEVEL_SENSOR" id="hi_level">
<circle cx="290" cy="43" r="3"/>
<path d="M 290 46 L 287 43 L 293 43 L 290 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low_level">
<circle cx="290" cy="94" r="3"/>
<path d="M 290 97 L 287 94 L 293 94 L 290 97 "/>
</g>
</g>
<g class="BUNKER_GRAINER_BACK" id="2_22">
<path d="M 373 38 L 399 38 L 399 100 L 373 100 L 373 38 "/>
<path d="M 373 100 L 382 110 L 390 110 L 399 100 "/>
<g class="LEVEL_SENSOR" id="hi">
<circle cx="392" cy="43" r="3"/>
<path d="M 392 46 L 389 43 L 395 43 L 392 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low">
<circle cx="392" cy="94" r="3"/>
<path d="M 392 97 L 389 94 L 395 94 L 392 97 "/>
</g>
<g class="BUNKER_GRAINER_BACK_LOW" >
<path d="M 382 110 L 373 100 L 373 97 L 399 97 L 399 100 L 390 110 L 382 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_MIDDLE" >
<path d="M 382 110 L 373 100 L 373 70 L 399 70 L 399 100 L 390 110 L 382 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_HI" >
<path d="M 382 110 L 373 100 L 373 46 L 399 46 L 399 100 L 390 110 L 382 110 "/>
</g>
</g>
<g class="BUNKER_GRAINER_MILL" id="1_19">
<path d="M 323 38 L 373 38 L 373 100 L 323 100 L 323 38 "/>
<path d="M 323 100 L 343 110 L 353 110 L 373 100 "/>
<g class="BUNKER_GRAINER_MILL_HI" >
<path d="M 343 110 L 323 100 L 323 46 L 373 46 L 373 100 L 353 110 L 343 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_LOW" >
<path d="M 343 110 L 323 100 L 323 97 L 373 97 L 373 100 L 353 110 L 343 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_MIDDLE" >
<path d="M 343 110 L 323 100 L 323 70 L 373 70 L 373 100 L 353 110 L 343 110 "/>
</g>
<g class="LEVEL_SENSOR" id="hi_level">
<circle cx="366" cy="43" r="3"/>
<path d="M 366 46 L 363 43 L 369 43 L 366 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low_level">
<circle cx="366" cy="94" r="3"/>
<path d="M 366 97 L 363 94 L 369 94 L 366 97 "/>
</g>
</g>
<g class="BUNKER_GRAINER_MILL" id="1_17">
<path d="M 171 38 L 221 38 L 221 100 L 171 100 L 171 38 "/>
<path d="M 171 100 L 191 110 L 201 110 L 221 100 "/>
<g class="BUNKER_GRAINER_MILL_HI" >
<path d="M 191 110 L 171 100 L 171 46 L 221 46 L 221 100 L 201 110 L 191 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_LOW" >
<path d="M 191 110 L 171 100 L 171 97 L 221 97 L 221 100 L 201 110 L 191 110 "/>
</g>
<g class="BUNKER_GRAINER_MILL_MIDDLE" >
<path d="M 191 110 L 171 100 L 171 70 L 221 70 L 221 100 L 201 110 L 191 110 "/>
</g>
<g class="LEVEL_SENSOR" id="hi_level">
<circle cx="214" cy="43" r="3"/>
<path d="M 214 46 L 211 43 L 217 43 L 214 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low_level">
<circle cx="214" cy="94" r="3"/>
<path d="M 214 97 L 211 94 L 217 94 L 214 97 "/>
</g>
</g>
<g class="BUNKER_GRAINER_BACK" id="2_20">
<path d="M 221 38 L 247 38 L 247 100 L 221 100 L 221 38 "/>
<path d="M 221 100 L 230 110 L 238 110 L 247 100 "/>
<g class="LEVEL_SENSOR" id="hi">
<circle cx="240" cy="43" r="3"/>
<path d="M 240 46 L 237 43 L 243 43 L 240 46 "/>
</g>
<g class="LEVEL_SENSOR" id="low">
<circle cx="240" cy="94" r="3"/>
<path d="M 240 97 L 237 94 L 243 94 L 240 97 "/>
</g>
<g class="BUNKER_GRAINER_BACK_LOW" >
<path d="M 230 110 L 221 100 L 221 97 L 247 97 L 247 100 L 238 110 L 230 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_MIDDLE" >
<path d="M 230 110 L 221 100 L 221 70 L 247 70 L 247 100 L 238 110 L 230 110 "/>
</g>
<g class="BUNKER_GRAINER_BACK_HI" >
<path d="M 230 110 L 221 100 L 221 46 L 247 46 L 247 100 L 238 110 L 230 110 "/>
</g>
</g>
<g class="MILL" id="1_6">
<path d="M 184 227 L 189 227 L 189 247 L 184 247 L 184 227 "/>
<path d="M 189 264 L 189 207 L 356 207 L 356 264 L 189 264 L 189 264 "/>
<path d="M 369 266 L 384 266 L 384 271 L 369 271 L 369 266 "/>
<path d="M 362 227 L 367 227 L 367 247 L 362 247 L 362 227 "/>
<path d="M 356 269 L 362 269 L 362 203 L 356 203 L 356 269 "/>
<path d="M 372 252 L 381 252 L 381 266 L 372 266 L 372 252 "/>
<g class="BEARING" id="rigth">
<path d="M 367 252 L 386 252 L 386 221 L 367 221 L 367 252 "/>
<g class="TEMPERATURE_SENSOR" >
<path d="M 368 223 L 385 223 L 385 230 L 368 230 L 368 223 "/>
<text class="LABEL" x="369" y="229">t</text>
</g>
<g class="TEMPERATURE_SENSOR" >
<path d="M 368 232 L 385 232 L 385 239 L 368 239 L 368 232 "/>
<text class="LABEL" x="369" y="238">t</text>
</g>
<g class="TEMPERATURE_SENSOR" >
<path d="M 368 241 L 385 241 L 385 248 L 368 248 L 368 241 "/>
<text class="LABEL" x="369" y="247">t</text>
</g>
</g>
<path d="M 167 266 L 182 266 L 182 271 L 167 271 L 167 266 "/>
<path d="M 170 252 L 179 252 L 179 266 L 170 266 L 170 252 "/>
<g class="BEARING" id="rigth">
<path d="M 165 252 L 184 252 L 184 221 L 165 221 L 165 252 "/>
<g class="TEMPERATURE_SENSOR" >
<path d="M 166 223 L 183 223 L 183 230 L 166 230 L 166 223 "/>
<text class="LABEL" x="167" y="229"">t</text>
</g>
<g class="TEMPERATURE_SENSOR" >
<path d="M 166 232 L 183 232 L 183 239 L 166 239 L 166 232 "/>
<text class="LABEL" x="167" y="238">t</text>
</g>
<g class="TEMPERATURE_SENSOR" >
<path d="M 166 241 L 183 241 L 183 248 L 166 248 L 166 241 "/>
<text class="LABEL" x="167" y="247">t</text>
</g>
</g>
<path d="M 165 228 L 151 228 L 151 239 L 165 247 "/>
</g>
<g class="CONVEYOR" id="2_7">
<path d="M 102 241 L 115 241 L 115 246 L 102 246 L 102 241 "/>
<g class="EMERGENCY_STOP" >
<text class="LABEL" x="89" y="242" >АС</text>
<path d="M 88 238 L 95 238 L 95 243 L 88 243 L 88 238 "/>
</g>
<g class="EMERGENCY_STOP" >
<text class="LABEL" x="118" y="245" >АС</text>
<path d="M 117 241 L 124 241 L 124 246 L 117 246 L 117 241 "/>
</g>
<g class="EMERGENCY_STOP" >
<text class="LABEL" x="136" y="245" >АС</text>
<path d="M 135 241 L 142 241 L 142 246 L 135 246 L 135 241 "/>
</g>
<g class="BELT_SENSOR" >
<text class="LABEL" x="97" y="256" >ДКСЛ</text>
<!--<path d="M 96 252 L 111 252 L 111 257 L 96 257 L 96 252 "/>-->
</g>
<g class="BELT_SENSOR" >
<text class="LABEL" x="128" y="256" >ДКСЛ</text>
<!--<path d="M 127 252 L 142 252 L 142 257 L 127 257 L 127 252 "/>-->
</g>
<g class="CONVEYOR_BELT" >
<path d="M 96 247 L 142 247 L 142 251 L 96 251 "/>
<g class="CONVEYOR_MOTOR_DRUM_2" >
<circle cx="91" cy="249" r="5"/>
<text class="LABEL" x="89" y="250" >M</text>
</g>
</g>`