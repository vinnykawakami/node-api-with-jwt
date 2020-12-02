const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
	beforeEach(async () => {
		await truncate();
	});
	
	it("should create a new user", async () => {
		const passwordHash = await bcrypt.hash("ga16010217MVCp", 8);
		
		const user = await User.create({
			name: "Marcus Vinicius (Vinny)",
			email: "viniciuskawakami@hotmail.com",
			password: passwordHash
		});

		expect(user.email).toBe('viniciuskawakami@hotmail.com');
	});

	it("should encrypt user password", async () => {
		const user = await User.create({
			name: "Diego",
			email: "diego@rocketseat.com.br",
			password: "123456"
		});

		const compareHash = await bcrypt.compare("123456", user.password_hash);

		expect(compareHash).toBe(true);
	});
});
