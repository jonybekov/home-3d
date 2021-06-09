import create from "zustand";

export const [useLoader] = create((set) => ({
  progress: 0,
  setProgress: (value) => set((state) => ({ progress: value })),
  reset: () => set({ progress: 0 })
}));

export const useModel = create((set) => ({
  model: null,
  scene: null,
  activeFloor: "Safe_Area",
  lightMaps: null,
  floorMaterial: null,
  wallMaterial: null,
  doorMaterial: null,
  setModel: (value) => set({ model: value }),
  setScene: (value) => set({ scene: value }),
  setLightMaps: (value) => set({ lightMaps: value }),
  setActiveFloor: (value) => set({ activeFloor: value }),
  setFloorMaterial: (value) => set({ floorMaterial: value }),
  setWallMaterial: (value) => set({ wallMaterial: value }),
  setDoorMaterial: (value) => set({ doorMaterial: value })
}));

// const [useInterior] = create((set) => )

// export { useLoader, useModel };
