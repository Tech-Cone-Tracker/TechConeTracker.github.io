// Data Definition
const data = [
    { year: 1872, term: "Dedekind 1872: Continuity and Irrational Numbers", class: "human", related: ["a", "b"] },
    { year: 1888, term: "Dedekind 1888: What Are Numbers and What They Should Be", class: "human", related: ["a", "b"] },
    { year: 1910, term: "Principia Mathematica (1910)", class: "human", related: ["a", "b"] },
    { year: 1921, term: "Skolem's Paradox (1921)", class: "computer", related: ["a", "b"] },
    { year: 1930, term: "Completeness Theorem (1930)", class: "human", related: ["a", "b"] },
    { year: 1931, term: "Incompleteness Theorem (1931)", class: "human", related: ["a", "b"] },
    { year: 1934, term: "Lambda Calculus (1934)", class: "human", related: ["a", "b"] },
    { year: 1936, term: "Turing Machine (1936)", class: "computer", related: ["a", "b"] },
    { year: 1936, term: "Halting Problem (1936)", class: "computer", related: ["a", "b"] },
    { year: 1940, term: "Von Neumann Architecture (1940)", class: "computer", related: ["a", "b"] },
    { year: 1960, term: "Fortran (1960)", class: "computer", related: ["a", "b"] },
    { year: 1960, term: "Lisp (1960)", class: "computer", related: ["a", "b"] },
    { year: 1971, term: "NP-Completeness (1971)", class: "computer", related: ["a", "b"] },
    { year: 1980, term: "Automated Theorem Proving (1980s)", class: "computer", related: ["a", "b"] },
    { year: 2005, term: "Four Color Theorem (2005)", class: "computer", related: ["a", "b"] },
    { year: 2005, term: "Proof of Four Color Theorem", class: "human", related: ["a", "b"] },
    { year: 2017, term: "Large LLMs (2017-2024)", class: "computer", related: ["a", "b"] },
    { year: 2024, term: "Quantum Computing (2024+)", class: "computer", related: ["a", "b"] },
  ];
  
  // SVG and Tooltip Elements
  const svg = document.getElementById("spiral");
  const tooltip = document.getElementById("tooltip");
  const filterButton = document.getElementById("filterButton");
  const startYearInput = document.getElementById("startYear");
  const endYearInput = document.getElementById("endYear");
  
  // Spiral Configurations
  const width = 600;
  const height = 600;
  const numTurns = 10;
  const points = 2000;
  
  svg.setAttribute("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);
  
  // Generate Spiral Path
  const pathData = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * (2 * Math.PI * numTurns);
    const radius = (i / points) * (Math.min(width, height) / 2.2);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    pathData.push({ x, y });
  }
  
  // Function to Draw Spiral
  function drawSpiral(filteredData) {
    svg.innerHTML = "";
  
    if (!filteredData.length) {
      alert("No data found for the selected range!");
      return;
    }
  
    const totalDots = filteredData.length;
    const dotIndices = Array.from({ length: totalDots }, (_, i) =>
      Math.round((i / (totalDots - 1)) * (pathData.length - 1))
    );
  
    // Draw Main Dots and Asteroid Dots
    dotIndices.forEach((index, dataIndex) => {
      const { x, y } = pathData[index];
      const dotClass = filteredData[dataIndex].class === "human" ? "dot-human" : "dot-computer";
  
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", 5);
      dot.setAttribute("class", `dot ${dotClass}`);
      svg.appendChild(dot);
  
      // Add Related Dots (Asteroid Belt)
      const related = filteredData[dataIndex].related || [];
      const angleStep = (2 * Math.PI) / related.length;
  
      related.forEach((info, i) => {
        const relAngle = angleStep * i;
        const relRadius = 15;
        const relX = x + relRadius * Math.cos(relAngle);
        const relY = y + relRadius * Math.sin(relAngle);
  
        const smallDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        smallDot.setAttribute("cx", relX);
        smallDot.setAttribute("cy", relY);
        smallDot.setAttribute("r", 3);
        smallDot.setAttribute("class", "dot-related");
        svg.appendChild(smallDot);
  
        smallDot.addEventListener("mouseover", (event) => {
          tooltip.style.display = "block";
          tooltip.style.left = `${event.clientX}px`;
          tooltip.style.top = `${event.clientY}px`;
          tooltip.textContent = info;
        });
  
        smallDot.addEventListener("mouseout", () => {
          tooltip.style.display = "none";
        });
      });
  
      dot.addEventListener("mouseover", (event) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY}px`;
        tooltip.textContent = `${filteredData[dataIndex].year}: ${filteredData[dataIndex].term}`;
      });
  
      dot.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });
    });
  
    // Draw Spiral Path
    const spiralPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = pathData.reduce((acc, point, index) => {
      if (index === 0) return `M${point.x},${point.y}`;
      return acc + ` L${point.x},${point.y}`;
    }, "");
  
    spiralPath.setAttribute("d", d);
    spiralPath.setAttribute("fill", "none");
    spiralPath.setAttribute("stroke", "#000");
    spiralPath.setAttribute("stroke-width", 1);
    svg.appendChild(spiralPath);
  }
  
  // Filter Button Click Handler
  filterButton.addEventListener("click", () => {
    const startYear = parseInt(startYearInput.value, 10) || Number.MIN_VALUE;
    const endYear = parseInt(endYearInput.value, 10) || Number.MAX_VALUE;
  
    const filteredData = data.filter(
      (item) => item.year >= startYear && item.year <= endYear
    );
  
    drawSpiral(filteredData);
  });
  
  // Navigation Function
  function navigate(page) {
    window.location.href = page;
  }
  
  // Theme Toggle
  const toggleThemeButton = document.getElementById("toggleTheme");
  toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
  });
  
  // Initial Render
  drawSpiral(data);