import styled from 'styled-components';

export const Box = styled.div`
padding: 1rem;
background: black;
position: fixed;
left:0;
bottom:0;
right:0;
width: 100%;
max-height: fit-content;

@media (max-width: 1000px) {
	padding: 1rem;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1000px;
	margin: 0 auto;
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: white;
font-size: 1rem;
text-decoration: none;

&:hover {
	color: #AC2B37;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 1rem;
color: white;
font-weight: bold;
`;
