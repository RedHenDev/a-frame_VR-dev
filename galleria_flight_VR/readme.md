A first, experimental web dev project (HTML and JavaScript) following online tutorials for basic use of A-frame.

NB Key dev was ability to access and change position of camera (then using polar co-ordinates to steer in forward direction, i.e. via yaw as theta).

Issues:

crossorigin error when using directory images or images not from same origin as A-frame itself. Solved by just setting crossorigin attribute.

When using mobile VR (Android Chrome) script that moves position of camera no longer works. Work-around solution is to select all scene entities and then iterate over these and change *their* positions instead of the camera's.

