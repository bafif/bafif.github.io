extends SceneTree
## A walk through TellMAP for the portfolio video. Godot runs at a fixed 30 frames per second and the script saves
## every frame of the window as a JPEG in $CUADROS (Movie Maker would scale the window to the project's 1600×900):
##   CUADROS=dir godot --path ~/tmap --fixed-fps 30 -s tellmap.gd
## Egypt in 1350 BC, the years run to AD 117 while the camera pulls back over the Mediterranean, then it flies
## to Rome and opens the place.

var _t := -1.0
var _paso := 0
var _vista
var _cuadro := 0
var _cuadros := OS.get_environment("CUADROS")
var Estado
var DatosMapa
var Proyeccion


func _initialize() -> void:
	pass


## Autoloads aren't identifiers for a script passed with -s, and the root joins the tree after _initialize:
## everything starts on the first frame.
func _arrancar() -> void:
	Estado = root.get_node("Estado")
	DatosMapa = root.get_node("DatosMapa")
	Proyeccion = load("res://scripts/nucleo/proyeccion.gd")
	Estado.ajustes["bienvenida_vista"] = true
	change_scene_to_file("res://scenes/principal.tscn")


func _px(lon: float, lat: float) -> Vector2:
	return Proyeccion.a_px(lon, lat)


func _process(delta: float) -> bool:
	if Estado == null:
		_arrancar()
		return false
	if not Estado.cargado:
		return false
	if _t < 0.0:
		_t = 0.0
		_vista = current_scene.vista
		Estado.fijar_anio(-1350)
		_vista.volar_a(_px(31.0, 27.5), 1.6)
		return false
	_t += delta
	# The loading screen fades out in half a second; frames start after it.
	if _t > 0.5:
		root.get_texture().get_image().save_jpg("%s/%05d.jpg" % [_cuadros, _cuadro], 0.93)
		_cuadro += 1
	if _paso == 0 and _t > 1.6:
		_paso = 1
		_vista.volar_a(_px(22.0, 36.0), 0.85)
	if _paso >= 1 and _t > 1.6 and _t < 8.0:
		var f := clampf((_t - 2.0) / 5.6, 0.0, 1.0)
		f = f * f * (3.0 - 2.0 * f)
		Estado.fijar_anio(int(round(lerpf(-1350.0, 117.0, f))))
	if _paso == 1 and _t > 8.4:
		_paso = 2
		Estado.fijar_anio(117)
		_vista.volar_a(_px(12.5, 41.9), 2.2)
	if _paso == 2 and _t > 9.8:
		_paso = 3
		var p := _px(12.5, 41.9)
		var u = DatosMapa.unidad_en(p)
		if u > 0:
			Estado.seleccionar_lugar(u, p)
	return _t > 14.0
