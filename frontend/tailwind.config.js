module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
	darkMode: false,
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
	theme: {
		extend: {
			screens: {
				xs: { min: "0px", max: "400px" },
				sm: { min: "401px", max: "600px" },
				md: { min: "601px", max: "1000px" },
				lg: { min: "1001px", max: "1300px" },
				xl: "1301px",
				"2xl": "1551px",
			},
			colors: {
				primaryColorWithOpacity: "var(--primary-colorWithOpacity)",
				"secondary-color": "var(--secondary-color)",
				"warning-color": "var(--warning-color)",
				"danger-color": "var(--danger-color)",
				"danger-colorWithOpacity": "var(--danger-colorWithOpacity)",
				"info-color": "var(--info-color)",
				"straw-color": "var(--straw-color)",
				"muted-color": "var(--muted-color)",
				"success-color": "var(--success-color)",
				"text-color-purity": "var(--text-color-purity)",
				"text-color-dark": "var(--text-color-dark)",
				"background-color-light": "var(--background-color-light)",
				"background-color-dark": "var(--background-color-dark)",
				"background-color-ebony": "var(--background-color-ebony)",
				"background-color-metal": "var(--background-color-metal)",
				"background-color-jade": "var(--background-color-jade)",
				"background-color-raven": "var(--background-color-raven)",
				"background-color-leather": "var(--background-color-leather)",
				"background-color-pulp": "var(--background-color-pulp)",
				"color-lightTeal": "var(--color-lightTeal)",
				"color-darkTeal": "var(--color-darkTeal)",
				"color-champagne": "var(--color-champagne)",
				"color-greenishTeal": "var(--color-greenishTeal)",
				"color-TealWithOpacity": "var(--color-TealWithOpacity)",
				"color-notified": "var(--color-notified)",
				"color-poppedUp": "var(--color-poppedUp)",
				"color-soil": "var(--color-soil)",
				"color-tanz": "var(--color-tanz)",
				"color-slate": "var(--color-slate)",
				"color-cyan": "var(--color-cyan)",
				"color-purple": "var(--color-purple)",
				"color-pearl": "var(--color-pearl)",
				"color-admin": "var(--admin-color)",
			},

			fontSize: {
				"fontsize-strong": "var(--fontsize-strong)",
				"fontsize-tough": "var(--fontsize-tough)",
				"fontsize-pearl": "var(--fontsize-pearl)",
				"fontsize-trim": "var(--fontsize-trim)",
				"fontsize-glossy": "var(--fontsize-glossy)",
				"fontsize-virgin": "var(--fontsize-virgin)",
				"fontsize-brittle": "var(--fontsize-brittle)",
				"fontsize-smart": "var(--fontsize-smart)",
				"fontsize-pool": "var(--fontSize-pool)",
				"fontsize-small": "var(--fontsize-small)",
			},

			backgroundSize: {
				auto: "auto",
				cover: "cover",
				contain: "contain",
				"30%": "30%",
				"40%": "40%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				16: "4rem",
				"90%": "90%",
			},
			width: {
				"5%": "5%",
				"10%": "10%",
				"20%": "20%",
				"25%": "25%",
				"28%": "28%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"48%": "48%",

				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"75%": "75%",
				"80%": "80%",
				"90%": "90%",
				"95%": "95%",
				"96%": "96%",
				"97%": "97%",
				"98%": "98%",
				"99%": "99%",
				"100%": "100%",
			},
			right: {
				"10%": "10%",
				"12%": "12%",
				"20%": "20%",
				"25%": "25%",
				"30%": "30%",
				"35%": "35%",
				"40%": "40%",
				"45%": "45%",
				"48%": "48%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				"90%": "90%",
				"95%": "95%",
				"100%": "100%",
			},
			height: {
				"10%": "10%",
				"20%": "20%",
				"30%": "30%",
				"40%": "40%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				"85%": "85%",
				"90%": "90%",
				"95%": "95%",
				"98%": "98%",
				"100%": "100%",
			},

			flexBasis: {
				"10%": "10%",
				"20%": "20%",
				"30%": "30%",
				"40%": "40%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				"90%": "90%",
				"100%": "100%",
			},
			margin: {
				"1.5%": "1%",
				"2%": "2%",
				"5%": "5%",
				"10%": "10%",
				"15%": "15%",
				"18%": "18%",
				"20%": "20%",
				"30%": "30%",
				"40%": "40%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				"90%": "90%",
			},

			padding: {
				"1.5%": "1.5%",
				"2%": "2%",
				"5%": "5%",
				"10%": "10%",
				"20%": "20%",
				"30%": "30%",
				"40%": "40%",
				"50%": "50%",
				"60%": "60%",
				"70%": "70%",
				"80%": "80%",
				"90%": "90%",
			},
			animation: {
				fadeIn: "fadeIn 1s",
				fadeOut: "fadeOut 1s",
				fadeInOut: "fadeInOut 3s",
				slideIn: "slideIn 0.5s ease-in-out",
				slideOut: "slideOut 0.5s ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "1",
					},
				},
				fadeOut: {
					"0%": {
						opacity: "1",
					},
					"100%": {
						opacity: "0",
					},
				},
				fadeInOut: {
					"0%": {
						opacity: "0",
					},
					"25%": {
						opacity: "1",
					},
					"50%": {
						opacity: "1",
					},
					"75%": {
						opacity: "1",
					},
					"100%": {
						opacity: "0",
					},
				},
				slideIn: {
					from: {
						width: "0%",
					},
					to: {
						width: "28%",
					},
				},
				slideOut: {
					from: {
						width: "28%",
					},
					to: {
						width: "0%",
					},
				},
			},

			boxShadow: {
				material: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
			},
		},
	},
	plugins: [],
};
