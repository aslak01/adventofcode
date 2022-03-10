pass1 = obj.map(i => { let count = 0; let matching = (i.pass.match(/' + i.key + '/g') || []).length; if (matching >= i.min && matching <= i.max) count ++; return count })

(obj[0].pass.match('/',obj[0].key,'/g') || []).length


function regextest(str, key, pos) {
	str.match('/.{' + pos + '}' + key + '/') ? true : false
}

function regextest2 (str, key, min, max) {
	let regex = RegExp('(?=.{' + min + '}(?<=' + key + '))(?!.{' + max + '}(?<=' + key + ')).*|(?!.{' + min + '}(?<=' + key + '))(?=.{' + max + '}(?<='  + key + ')).*');
	return regex.test(str)
}


slopes.forEach((slope) => {
	let colInc = slope[0];
	let rowInc = slope[1];
	currCol = 0;
	treesHit = 0;

	for (let currRow = 0; currRow < lines.length; currRow += rowInc) {
		if (lines[currRow][currCol] === TREE) {
			treesHit++;
		}
		currCol = (currCol + colInc) % inputWidth;
	}
	slopeTrees.push(treesHit);
});


// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
// day 4
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

let data
data = document.getElementsByTagName("pre")[0].innerHTML.split("\n\n")
data = data.map(i => i.replace(/[\r\n]+/g," "));

let obs = []
data.map( i => {
	let result = {};
	i.split(" ")
	.map(x => x.split(":"))
		.forEach(([key,value]) => result[key] = value)
	obs.push(result)
})

let keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

function arrayContainsArray (superset, subset) {
	if (0 === subset.length) {
		return false;
	}
	return subset.every(function (value) {
		return (superset.indexOf(value) >= 0);
	});
}
let valids = 0
obs.map(i=> {if (arrayContainsArray(Object.keys(i), keys)) valids += 1})

//pt2
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

toValidation = obs.flatMap(i => arrayContainsArray(Object.keys(i), keys) ? i : []);

let stillValids = 0;
let ecls = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]

//byr year 1920-2002
//iyr year 2010-2020
//eyr year 2020-2030
//hgt 150-193 cm / 59-76 in 
//hcl # + 6x0-9 a-f
//ecl ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
//pid 9 digs


stillValids = 0;
toValidation.map(i => {
	/^(19[2-9][0-9]|200[0-2])$/.test(i.byr) &&
	/^(201[0-9]|2020)$/.test(i.iyr) &&
	/^(202[0-9]|2030)$/.test(i.eyr) &&
	/^((1[5-8][0-9]|19[0-3])\w([cm]))$|^((59|6[0-9]|7[0-6])\w([in]))$/.test(i.hgt) &&
	/^[#]([\da-f]{6})$/.test(i.hcl) &&
	/^[0-9]{9}$/.test(i.pid) &&
	ecls.includes(i.ecl) ? stillValids += 1 : 
	console.log(
		"byr", i.byr, /^(19[2-9][0-9]|200[0-2])$/.test(i.byr),
		"iyr", i.iyr, /^(201[0-9]|2020)$/.test(i.iyr), 
		"eyr", i.eyr, /^(202[0-9]|2030)$/.test(i.eyr), 
		"hgt", i.hgt, /^((1[5-8][0-9]|19[0-3])\w([cm]))$|^((59|6[0-9]|7[0-6])\w([in]))$/.test(i.hgt),
		"hcl", i.hcl, /^[#]([\da-f]{6})$/.test(i.hcl),
		"pid", i.pid, /^[0-9]{9}$/.test(i.pid), 
		"ecl", i.ecl, ecls.includes(i.ecl), 
	)
})
stillValids


// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
// day 5
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.split("\n")
data.pop()

function calcSeat (mess) {
	function calcRow (mess) {
		let row = 0;
		let front = 0;
		let back = 128;
		for (let i = 0; i <= 6; i++) {
			mess[i] == "F" ? 
				back = back - ((back - front)/2) : 
				front = front + ((back-front)/2)
		}
		mess[6] == "F" ? row = front : row = back -1;
		return row
	}
	function calcColumn (mess) {
		let column = 0;
		let left = 0;
		let right = 8;
		for (let i = 7; i <= 9; i++) {
			mess[i] == "L" ?
			  right = right - ((right - left)/2) : 
				left = left + ((right - left)/2)
		}
		mess[9] == "L" ? column = left : column = right -1;
		return column;
	}
	let row = calcRow(mess);
	let column = calcColumn(mess);
	let seatId = (row*8)+column
	return seatId
}
let ids = []
ids = []
ids = data.map(i => calcSeat(i))
Math.max(...ids)

// Math.max.apply(Math, ids.map(o => o.seatId ))


// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
//day 6
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.split("\n\n")
	.map(i => i.replace( /[\r\n]+/gm, ""))
//dedupe
data = data.map(i => Array.from(new Set(i.split(''))))
data.reduce((acc,element) => acc + element.length, 0);
//6583

// p2
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.toString().trim().split("\n\n")
	.map(i => ({ 
		data: Object.fromEntries(i
			.replace(/[\r\n]+/gm, "")
			.split("")
			.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()
			)
		),
		length: i.split("\n").length 
	}))

ys = 0
data.map(i => {
	return Object.values(i.data).map(v => v === i.length ? ys++ : null)
})
ys
//3289 too low… 3290 answer

// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
//day 7
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
data = document
	.getElementsByTagName("pre")[0]
	.innerHTML
	.toString()
	.trim()
	.replace(/\./g, "")
	.split("\n")

// https://www.reddit.com/r/adventofcode/comments/k8a31f/2020_day_07_solutions/gf6b36d/

function parseBagObjs () {
	let bagList = {};
	let textByLine = data.forEach(x => {
		x = x.split("bags").join("");
		x = x.split("bag").join("");

		let split = x.split("contain");
		let containSplit = split[0].trim();
		let bagsSplit = split[1].split(",");
		
		let bagContents = [];		
		bagsSplit.forEach(z => {
			let howMany = parseInt(z.trim().substring(0, 1));
			for (let i = 0; i < howMany; i++) {
				bagContents.push((z.trim().substring(2, z.length)));
			}
		})
		bagList[containSplit] = bagContents;
	})
	return bagList;
}
// Process: Find bags that contain gold bags (findGold), then bags which contains those bags (findColour) until top level is achieved, and ignoring bags if colour was already considered (var colours), as each colour bag has only one rule.

function howManyBags (input) {
	let bags = parseBagObjs();
	let colors = findBag(bags, input);
	return iterator(bags, colors).length
}

function findBag (bags, input) {
	let hasBag = [];
	for (let bag in bags) {
		if (bags[bag].includes(input)) {
			hasBag.push(bag)
		}
	}
	return hasBag;
}

function iterator (bags, colors) {
	let currentBagLength = colors.length;
	
	while (true) {
		colors = findColor(bags, colors);
		if (colors.length === currentBagLength) {
			return colors;
		} else {
			currentBagLength = colors.length;
		}
	}
}

function findColor(bags, colors) {
	colors.forEach(color => {
		for (let bag in bags) {
			if (colors.indexOf(bag) === -1 && bags[bag].includes(color)) {
				colors.push(bag);
			}
		}
	})
	return colors;
}
howManyBags("shiny gold") //103

// Pt. 2
// Process: Look inside the shiny gold bag, then find the contents of each of those (getNextLevel) until there are no more bags to look through, counting the length each time.

function whatsInMyBag(input) {
	const bags = parseBagObjs();
	let currentBag = bags[input];
	let nrInside = currentBag.length;
	
	while (true) {
		if (currentBag.length > 0) {
			currentBag = getNextLevel(currentBag, bags);
			nrInside = nrInside + currentBag.length;
		} else {
			return nrInside;
		}
	}
}

function getNextLevel(currentBag, bags) {
	let nextBagLevel = [];
	currentBag.forEach(b => {
		nextBagLevel = nextBagLevel.concat(bags[b]);
	})
	return nextBagLevel;
}

whatsInMyBag("shiny gold")

// ………………………………………………………………………………………………………………………………………………………………………………………………………………………
// Dag 8
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.toString().trim().split("\n")


function executor () {
	let visited = []
	let length = data.length;
	let accum = 0;
	for (let i = 0; i < length; i += 1) {
		if (visited.indexOf(i) === -1) {
			visited.push(i)
			let command = data[i].split(" ")[0];
			let operator = data[i].split(" ")[1][0]
			let number = parseInt(data[i].split(" ")[1].split(/[+-]/)[1])
			console.log(i, command, operator, number, accum)
			if (command === "jmp") {i = eval(i + operator + number) - 1}
			if (command === "acc") {accum = eval(accum + operator + number)}
		} else {
			return accum;
		}
	}
}

// pt2
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

let run = []
function runOpLister () {
	let visited = []
	let length = data.length;
	for (let i = 0; i < length; i += 1) {
		let command = data[i].split(" ")[0];
		if (command !== "acc") run.push({i, command })
	}
}
runOpLister()

function getInstructions(i) {
	const command = data[i].split(" ")[0];
	const number = parseInt(data[i].split(" ")[1]);
	return {command, number}
}

let result = []
function executorFix (limit) {
	let runLength = run.length;
	let length = data.length;
	let trialResults = []
	loop1:
	for (let r = 0; r < runLength; r += 1) {
		let accum = 0;
		let counter = 0;
		let changedI = run[r].i
		let changedC = run[r].command
		console.log(r)
		loop2:
		for (let i = 0; i < length;) {
			counter += 1;
			
			let command = getInstructions(i).command
			let number = getInstructions(i).number
			
			if (counter < limit) {
				if (changedI === i) {
					changedC === "jmp" ? command = "nop" : command = "jmp";
				}
				
				if (command === "jmp") {
					let jump = i + number
					if (jump < length){
						i = jump
					} else {
						console.log("reached end")
						trialResults.push({i, accum});
						break loop1;
					}
				}
				if (command === "acc") {accum = accum + number; i+=1}
				if (command === "nop") {i+=1}
			} else {
				console.log("looped " + limit + " times")
				trialResults.push({i, accum});
				break loop2;
			}
		}
	}
	result = trialResults
}
executorFix(20000)
results.filter(i => i.i > 600)

// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//dag9 
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.trim().split("\n");
data = data.map(i => parseInt(i));


function selectPrev25 (i) {
	return data.slice((i-25), i)
}

function calcAllSums (input) { 
	let uniqueSums = new Set();
	for (let i = 0; i<25; i+=1) {
		let otherNumbers = input.slice(0,i).concat(input.slice(i+1))
		for (let y = 0; y <24; y+=1) {
			let a = input[i]
			let b = otherNumbers[y]
			uniqueSums.add((a + b))
		}
	}
	return Array.from(uniqueSums)
}

function firstNonProduct(data) {
	for (let i = 25; i < data.length; i+= 1) {
		let factors = selectPrev25(i)
		let products = calcAllSums(factors)
		let number = data[i]
		if (products.indexOf(number) === -1) {
			return {i, number}
		}
	}
}

firstNonProduct(data)
// {i: 542, number: 50047984}

// pt2
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

const goal = firstNonProduct(data).number;

function findSumExpanding (goal) {
	const target = goal;
	const length = data.length;
	for (let i = 0; i < length; i++) {
		let x = i+2;
		let toSum = [];
		let product = 0;
		console.log(i)
		do {
			toSum = data.slice(i, x);
			product = toSum.reduce((a, b) => a + b, 0);
			x++;
			if ((goal - product) < 1000) console.log(product)
			if (product === target) {
				let resultArr = toSum.sort();
				return resultArr
			}
		} while (product <= target) 
	}
}

let results = findSumExpanding (goal)
let answer = results[0] + results[results.length-1]



// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//dag 10
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.trim().split("\n");
data = data.map(i => parseInt(i));

// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//dag 11
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………



// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
//dag 12
// ………………………………………………………………………………………………………………………………………………………………………………………………………………………

data = document.getElementsByTagName("pre")[0].innerHTML.trim().split("\n");

				// 	 N
			 // W			E
				// 	 S



function getInstruction (data) {
	let command = data[0].toLowerCase();
	let value = parseInt(data.slice(1, data.length))
	return {command, value}
}
function parseRotation (data, curr) {
	let direction = curr;
	let directions = ["n", "e", "s", "w"]
	if (data.value === 180) {
		if (direction === "n") {
			direction = "s"
		} else if (direction === "e") {
			direction = "w"
		} else if (direction === "s") {
			direction = "n"
		} else if (direction === "w") {
			direction = "e"
		}
	} else if (data.command === "R") {
		
	}
}

function followInstructions (data) {
	let direction = "E";
	let directions = {
		n: 0,
		s: 0,
		e: 0,
		w: 0 };
	
}
