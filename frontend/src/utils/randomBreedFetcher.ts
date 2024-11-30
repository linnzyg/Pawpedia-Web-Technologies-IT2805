type BreedNode = {
    node: { id: string };
  };
  
  export const getRandomBreedId = (edges: BreedNode[]) => {
    if (edges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * edges.length);
    return edges[randomIndex].node.id;
  };
  