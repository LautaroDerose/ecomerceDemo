import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { color } from '../data/colorData';
import { size } from '../data/sizeData';
import Footer from '../components/Footer';
const Container = styled.section`
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  ${mobile({ marginTop: '1.25rem', marginTop: '5rem' })}
`;

const FilterContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 1.25rem;
  ${mobile({ width: '0rem 1.25rem', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1.25rem;
  color: ${({ theme }) => theme.text};
  ${mobile({ marginRight: '0rem' })}
`;

const Select = styled.select`
  text-align: center;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.bg};
  padding: 0.625rem;
  margin-right: 1.25rem;
  ${mobile({ margin: '0.625rem 0rem' })}
`;
const Option = styled.option``;

const ProductList = ({ darkMode, setDarkMode }) => {
  const [tags, setTags] = useState(null);
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const route = location.pathname.split('/');
  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route[2] === 'search') {
      // if the url[2] has search
      setQuery(route[3]);
    } else {
      setTags(route[2]); // if the url[2] does not have search
    }
  }, [route]);

  const handleFilters = (e) => {
    const value = e.target.value;
    value === 'All'
      ? setFilters(null)
      : setFilters({
          ...filters,
          [e.target.name]: value,
        });
  };

  return (
    <Container>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            {color.map((c) => {
              return (
                <Option key={c.id} tabIndex="0">
                  {c.color}
                </Option>
              );
            })}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled tabIndex="0">
              Size
            </Option>
            {size.map((s) => {
              return <Option key={s.id}>{s.size}</Option>;
            })}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products tag={tags} filters={filters} sort={sort} query={query} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
