// import { Vector2, Vector3, Euler, Spherical } from './three.js';
import * as THREE from 'three';

/**
 * Returns a parsed vector3 object.
 */
export function parseVector3(str) {
  return str.isVector3 ? str : new THREE.Vector3(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed vector2 object.
 */
export function parseVector2(str) {
  return str.isVector2 ? str : new THREE.Vector2(...str.trim().split(/\s+/).map(elm => parseFloat(elm)));
}

/**
 * Returns a parsed euler object.
 */
export function parseEuler(str) {
  return str.isEuler ? str : new THREE.Euler(...str.trim().split(/\s+/).map((elm, i) => (i === 3 ? elm : parseFloat(elm))));
}

/**
 * Returns a parsed spherical object.
 */
export function parseSpherical(str) {
  return str.isSpherical ? str : new THREE.Spherical(...str.trim().split(/\s+/).map(elm => parseFloat(elm))).makeSafe();
}

/**
 * Returns a parsed array.
 */
export function parseArray(str) {
  return Array.isArray(str) ? str : str.split(',');
}

/**
 * Returns a parsed array of vector2.
 */
export function parseVector2Array(str) {
  return parseArray(str).map(elm => parseVector2(elm));
}
