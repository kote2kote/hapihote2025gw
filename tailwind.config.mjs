/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				maxsm: { max: '639px' },
				smmd: { min: '640px', max: '767px' },
				maxmd: { max: '767px' },
				mdlg: { min: '768px', max: '1023px' },
				maxlg: { max: '1023px' },
				lgxl: { min: '1024px', max: '1279px' },
				maxxl: { max: '1279px' },
				min1390: { min: '1390px' },
				max1390: { max: '1389px' },
				xl2xl: { min: '1280px', max: '1535px' },
				max2xl: { max: '1535px' },
				pc: { min: '1680px' },
				maxpc: { max: '1680px' },
			}
		},
	},
	plugins: [],
}
