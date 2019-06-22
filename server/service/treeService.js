let calculateTreeSum = (req, res)=>{
    if (!req || !req.body){
        res.status(400).json({
            success: false,
            message: 'Request is invalid'
          });
        return;
    }
    
    let treeData = req.body.treeData;
    if (!treeData){
        res.status(400).json({
            success: false,
            message: 'Tree data is invalid'
          });
        return;
    }

    let ans = getTreeSum_dfs(treeData, 0);
    res.json({
        success: true,
        message: 'Tree data is processed',
        sum: ans.dist
      });
}

let getTreeSum_dfs = (node, level)=>{
    // Base case 1: node has no value
    if (node.val === undefined || node.val === null) return {level: level-1, dist: 0};
    // Base case 2: node has no children
    else if (!node.children || node.children.length ===0) return {level: level, dist: parseInt(node.val)};

    // general case
    let max_level = 0, max_dist = 0;
    node.children.forEach(child=>{
        let ans = getTreeSum_dfs(child, level+1);
        if (ans.level === max_level) max_dist = Math.max(max_dist, ans.dist);
        else if (ans.level > max_level){
            max_dist = ans.dist;
            max_level = ans.level;
        }
    });
    return {level: max_level, dist: max_dist+parseInt(node.val)};
}

module.exports = {
    calculateTreeSum: calculateTreeSum,
    getTreeSum_dfs: getTreeSum_dfs
};
