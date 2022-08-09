const pokemonName   = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage  = document.querySelector('.pokemon__image');
const form          = document.querySelector('.form__search');
const search        = document.querySelector('.input__search');
const buttonPrev    = document.querySelector('.btn__prev');
const buttonNext    = document.querySelector('.btn__next');

let searchPokemonId = 1;

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        //pokemonImage.src = data.sprites.front_default;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value = '';
        searchPokemonId = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(search.value);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemonId > 1) {
        searchPokemonId -= 1;
        renderPokemon(searchPokemonId.toString());
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemonId += 1;
    renderPokemon(searchPokemonId.toString());
})

renderPokemon(searchPokemonId.toString());