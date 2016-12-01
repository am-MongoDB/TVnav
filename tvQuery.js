db.products.aggregate([
	{
		$match: {category: "TV"}
	},
	{
		$facet: {
			price: [
				{
					$bucket: {
						groupBy: "$price",
						boundaries: [0, 200, 699, 1000, 1500],
						default: "Over 1500",
						output: {"count": {$sum: 1}}
					}
				},
				{
					$project: {
						lowerPriceBound: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			brands: [
				{
					$sortByCount: "$brand"
				},
				{
					$project: {
						brand: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			screenSize: [
				{
					$bucketAuto: {
						groupBy: "$specs.screenSize",
						buckets: 5
					}
				},
				{
					$project: {
						size: "$_id",
						_id: 0,
						count: 1
					}
				}
			],
			type: [
				{
					$sortByCount: "$specs.type"
				},
				{
					$project: {
						type: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			screenTechnology: [
				{
					$sortByCount: "$specs.screenTechnology"
				},
				{
					$project: {
						technology: "$_id",
						count: 1,
						_id: 0
					}
				}
			]
		}
	}
]).pretty()