import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { featureCollection, point } from '@turf/helpers';

MapboxGL.setAccessToken('<Your key here>');
MapboxGL.setTelemetryEnabled(false);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
const features = featureCollection([point([-10,-10])]);

const App = () => {
    const [rotation, setRotation] = useState(0);
    const [color, setColor] = useState('#fff');

  useEffect(()=>{
    setInterval(()=>{
      setRotation(r =>  (r + 1) % 360);
    }, 10);
    setInterval(()=>{
        setColor(getRandomColor())
    }, 1000)
  }, []);

    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} styleURL="http://localhost:3333/style.json" >
          <MapboxGL.Camera
            centerCoordinate={[0,0]}
            />
            <MapboxGL.ShapeSource id="icons" shape={features}>
              <MapboxGL.SymbolLayer
                id="clusters-layer"
                style={{
                  iconImage: "unknown",
                  iconColor: color,
                  iconRotate:rotation,
                }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }

export default App;
