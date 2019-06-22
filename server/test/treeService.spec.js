var assert = require('assert');
const treeService = require('../service/treeService');

var mock_tree_data_0 ={
    key: 'sdsdd',
    val: '1',
    children: [
        {
            key: 'hrhtr',
            val: '2',
            children: [
                {
                    key: 'cvdsvs',
                    val: '4',
                    children: []
                },
                {
                    key: 'gfdg',
                    val: '5',
                    children: [
                        {
                            key: 'sfgs',
                            val: '6',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            key: 'fsdfsd',
            val: '3',
            children: [
                {
                    key: 'bvbc',
                    val: '7',
                    children: [
                        {
                            key: 'rwerw',
                            val: '8',
                            children: [
                                {
                                    key: 'grge',
                                    val: '9',
                                    children: [
                                        {
                                            key: '67657',
                                            val: '15',
                                            children: []
                                        },
                                        {
                                            key: 'hrhr',
                                            val: '16',
                                            children: [
                                                {
                                                    key: 'sdsfsf',
                                                    val: '1',
                                                    children: [
                                                        
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'asdda',
                            val: '10',
                            children: [
                                {
                                    key: 'ewrew',
                                    val: '11',
                                    children: []
                                },
                                {
                                    key: 'hrthr',
                                    val: '12',
                                    children: [
                                        {
                                            key: 'zcvzcv',
                                            val: '13',
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'zvssdv',
                    val: '14',
                    children: []
                }
            ]
        }
    ]
};

var mock_tree_data_1 ={
    key: 'sdsdd',
    val: '1',
    children: [
        {
            key: 'hrhtr',
            val: '2',
            children: [
                {
                    key: 'cvdsvs',
                    val: '4',
                    children: []
                },
                {
                    key: 'gfdg',
                    val: '5',
                    children: [
                        {
                            key: 'sfgs',
                            val: '6',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            key: 'fsdfsd',
            val: '3',
            children: [
                {
                    key: 'bvbc',
                    val: '7',
                    children: [
                        {
                            key: 'rwerw',
                            val: '8',
                            children: [
                                {
                                    key: 'grge',
                                    val: '9',
                                    children: [
                                        {
                                            key: '67657',
                                            val: '15',
                                            children: []
                                        },
                                        {
                                            key: 'hrhr',
                                            val: '16',
                                            children: [
                                                
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'asdda',
                            val: '10',
                            children: [
                                {
                                    key: 'ewrew',
                                    val: '11',
                                    children: []
                                },
                                {
                                    key: 'hrthr',
                                    val: '12',
                                    children: [
                                        {
                                            key: 'zcvzcv',
                                            val: '13',
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'zvssdv',
                    val: '14',
                    children: []
                }
            ]
        }
    ]
};

describe('Tests for treeService', function() {
  describe('getTreeSum_dfs()', function() {
    it('should return sum in longest path', function() {
      assert.equal(treeService.getTreeSum_dfs(mock_tree_data_0, 0).dist, 45);
    });

    it('should handle empty data', function() {
      assert.equal(treeService.getTreeSum_dfs({}, 0).dist, 0);
    });

    it('should return largest sum when having multiple longest paths', function() {
      assert.equal(treeService.getTreeSum_dfs(mock_tree_data_1, 0).dist, 46);
    });
  });


  describe('calculateTreeSum()', function() {
    // TODO : wirte tests for calculateTreeSum()
    it('should handle empty data', function() {
        assert.equal(0, 0);
      });
    
  });

});