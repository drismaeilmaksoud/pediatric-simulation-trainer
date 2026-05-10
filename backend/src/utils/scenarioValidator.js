/**
 * Validates scenario JSON structure
 */
export const validateScenarioJSON = (content) => {
  try {
    const scenario = JSON.parse(content);
    
    // Check required fields
    if (!scenario.title) {
      throw new Error('Scenario must have a title');
    }
    
    if (!scenario.initialPresentation) {
      throw new Error('Scenario must have initialPresentation');
    }
    
    if (!Array.isArray(scenario.nodes) || scenario.nodes.length === 0) {
      throw new Error('Scenario must have at least one node');
    }
    
    // Validate each node
    scenario.nodes.forEach((node, index) => {
      if (!node.id) {
        throw new Error(`Node ${index} is missing id`);
      }
      
      if (!node.type) {
        throw new Error(`Node ${node.id} is missing type`);
      }
      
      if (!['decision', 'info', 'outcome'].includes(node.type)) {
        throw new Error(`Node ${node.id} has invalid type. Must be 'decision', 'info', or 'outcome'`);
      }
      
      if (node.type === 'decision' && !Array.isArray(node.options)) {
        throw new Error(`Decision node ${node.id} must have options array`);
      }
      
      // Validate options
      if (node.options) {
        node.options.forEach((option, optIndex) => {
          if (!option.text) {
            throw new Error(`Option ${optIndex} in node ${node.id} is missing text`);
          }
          
          if (option.correct === undefined) {
            throw new Error(`Option ${optIndex} in node ${node.id} is missing correct flag`);
          }
        });
      }
    });
    
    return { valid: true, scenario };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * Extracts metadata from scenario
 */
export const extractScenarioMetadata = (scenario) => {
  return {
    title: scenario.title,
    initialPresentation: scenario.initialPresentation,
    nodeCount: scenario.nodes.length,
    decisionPoints: scenario.nodes.filter(n => n.type === 'decision').length,
    learningObjectives: scenario.learningObjectives || [],
    estimatedTime: scenario.estimatedTime || null
  };
};
