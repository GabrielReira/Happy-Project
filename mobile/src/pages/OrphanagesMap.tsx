import React from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-marker.png';


export default function OrphanagesMap() {
  const navigation = useNavigation();

  function navigateToOrphanage () {
    navigation.navigate('Orphanage');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider ={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -13.0018201,
          longitude: -38.5069444,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0422,
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -13.0018201,
            longitude: -38.5069444,
          }}
        >
          <Callout tooltip={true} onPress={navigateToOrphanage}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar des menines</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>2 orfanatos encontrados</Text>

          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  footer: {
    height: 56,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    borderRadius: 20,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
